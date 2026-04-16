const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { summaryService, entryService } = require("../../services");
const moment = require("moment");
const {
  getEmailFormatForPackageExpiry,
  getSMSFormatForPackageExpiry,
  getLastDayOfMonth,
  getFirstAndLastDate,
} = require("../../utils/helpers");
const {
  sendEmailByInfo,
  sendSms,
  sendEmailByReminder,
  sendWhatsappMessage,
  sendTemplateForExpiry,
} = require("../../services/email.service");
let summaryController = {};

summaryController.getSummary = catchAsync(async (req, res) => {
  const { month, year } = req?.body;
  if (month && year) {
    const { dateFrom, dateTo } = getFirstAndLastDate(month, year);

    const ispsData = await summaryService.getSummaryByIsp(dateFrom, dateTo);

    const totalIncome = ispsData.reduce(
      (acc, item) => acc + +item?.totalProfit,
      0
    );

    const companyExpense = await summaryService.getCompanyExpense(
      dateFrom,
      dateTo
    );

    const partnersTotalExpense = await summaryService.getPartnersTotalEpxense(
      dateFrom,
      dateTo
    );

    const companyProfit = totalIncome - companyExpense;
    const totalRemainingProfit = companyProfit - partnersTotalExpense;

    const partnersExpenses = await summaryService.getPartnersEpxenses(
      dateFrom,
      dateTo,
      companyProfit
    );

    const totalPendingEntries =
      await entryService.getAlPendinglEntriesBetweenDate(dateFrom, dateTo);
    const totalPendingAmount = totalPendingEntries.reduce(
      (acc, item) => (acc += +item?.package?.saleRate),
      0
    );

    const totalExtraIncome = await summaryService.getTotalExtraIncome(
      dateFrom,
      dateTo
    );

    const totalNumberOfCompletedEntries =
      await entryService.getAlCompletedlEntriesWithoutIsp(dateFrom, dateTo);

    const totalNumberOfPendingEntries =
      await entryService.getAllPendingEntriesWithoutIsp(dateFrom, dateTo);

    res.send({
      ispsData,
      totalIncome,
      companyExpense,
      companyProfit,
      partnersTotalExpense,
      totalRemainingProfit,
      partnersExpenses,
      totalPendingAmount,
      totalExtraIncome,
      totalNumberOfCompletedEntries,
      totalNumberOfPendingEntries,
    });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Month or Year");
  }
});

summaryController.sendEmailsForTomorrowExpiry = catchAsync(
  async (req, res, next) => {
    await summaryController.sendEmailsAndMessagesForTomorrowExpiry();
    res.status(200).json({ message: "expiry alert Sent" });
  }
);

summaryController.sendEmailsAndMessagesForTomorrowExpiry = async () => {
  const expiredEntries = await entryService.getEntriesToExpireTomorrow();
  console.log("Total entries to expire tomorrow:", expiredEntries.length);
  let counter = 1;
  // await Promise.all(
  //   expiredEntries.map(async (item) => {
  //     console.log("Processing entry:", counter);
  //     counter++;
  //     const name = item?.user?.fullname;
  //     const userid = item?.user?.userId;
  //     const vlan = item?.entry?.isp?.vlan;
  //     const date = moment(item?.entry?.expiryDate).format("DD-MMM-YYYY");
  //     const email = item?.user?.email;
  //     const html = getEmailFormatForPackageExpiry(name, userid, vlan, date);
  //     console.log("Sending SMS to:", item?.user?.mobile);
  //     await sendTemplateForExpiry(item?.user?.mobile, name, userid, vlan, date)
  //   })
  // );

  for (const item of expiredEntries) {
    const name = item?.user?.fullname;
    const userid = item?.user?.userId;
    const vlan = item?.entry?.isp?.vlan;
    const date = moment(item?.entry?.expiryDate).format("DD-MMM-YYYY");

    console.log("Sending SMS to:", item?.user?.mobile);

    try {
      await sendTemplateForExpiry(
        item?.user?.mobile,
        name,
        userid,
        vlan,
        date
      );
    } catch (err) {
      console.log(err);
    }


    // small delay (VERY IMPORTANT)
    await new Promise((res) => setTimeout(res, 10000));
  }
};

module.exports = summaryController;
