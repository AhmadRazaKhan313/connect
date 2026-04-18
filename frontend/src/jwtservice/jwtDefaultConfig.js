// ─── Base URL Logic ───────────────────────────────────────────────────────────
const getBaseUrl = () => {
  const hostname = window.location.hostname; // e.g. bahawalpur.localhost
  const parts = hostname.split(".");

  const ignored = ["localhost", "www", "127", "api"];

  // Subdomain detect
  // Local:      bahawalpur.localhost  → parts = ["bahawalpur", "localhost"]
  // Production: bahawalpur.connect.lodhran.com → parts.length > 2
  const hasSubdomain =
    parts.length >= 2 && !ignored.includes(parts[0]) && parts[0] !== hostname;

  if (hasSubdomain) {
    if (hostname.includes("localhost")) {
      // Local dev — bahawalpur.localhost:4000
      return `http://${parts[1]}:4000/api/v1`;
      // Backend will be localhost — subdomain on frontend
    } else {
      // Production — api.connect.lodhran.com
      return `https://api.connect.lodhran.com/api/v1`;
    }
  }

  // Default — no subdomain
  return "http://localhost:4000/api/v1";
};

const BASE_URL = getBaseUrl();

// ─── Config Export ────────────────────────────────────────────────────────────
export default {
  tokenType: "Bearer",

  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
  storageUserKeyName: "user",
  storageIsLoginKeyName: "isLogin",

  // auth endpoints
  loginEndpoint: `${BASE_URL}/auth/login`,
  refreshEndpoint: `${BASE_URL}/auth/refreshToken`,
  logoutEndpoint: `${BASE_URL}/auth/logout`,
  updatePasswordEndpoint: `${BASE_URL}/auth/update-password`,
  resetPasswordEndpoint: `${BASE_URL}/auth/reset-password`,

  // isp endpoint
  ispEndpoint: `${BASE_URL}/isp`,

  // package endpoint
  packageEndpoint: `${BASE_URL}/package`,

  // staff endpoint
  staffEndpoint: `${BASE_URL}/staff`,
  updateProfileEndpoint: `${BASE_URL}/staff/update-profile`,

  // user endpoint
  userEndpoint: `${BASE_URL}/user`,

  // entry endpoint
  entryEndpoint: `${BASE_URL}/entry`,

  // invoice endpoint
  invoiceEndpoint: `${BASE_URL}/invoice`,

  // expense endpoint
  expenseEndpoint: `${BASE_URL}/expense`,

  // summary endpoint
  summaryEndpoint: `${BASE_URL}/summary`,

  // sms sending endpoint
  smsSendingEndpoint: `${BASE_URL}/sms-sending`,

  // extra income endpoint
  extraIncomeEndpoint: `${BASE_URL}/extra-income`,

  // organization endpoint
  organizationEndpoint: `${BASE_URL}/organization`,
  
};