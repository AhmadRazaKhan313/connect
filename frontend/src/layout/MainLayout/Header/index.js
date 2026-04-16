import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  FormLabel,
  Switch,
  Typography,
} from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons";
import useAppContext from "context/useAppContext";
import CustomMessageModal from "./CustomMessageModal";
import { useState } from "react";
import { Label } from "@mui/icons-material";
import { useEffect } from "react";
import jwt from "jwtservice/jwtService";
import { STAFF_TYPES, THEME_COLOR_DARK } from "utils/Constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  const { filters, data, setFilteredData, smsBalance, getSmsBalance } =
    useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [smsSwitch, setSmsSwitch] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line
    jwt
      .getSmsSending()
      // eslint-disable-next-line
      .then((res) => {
        setSmsSwitch(res?.data?.smsSending);
      })
      // eslint-disable-next-line
      .catch((err) => {});
  }, []);

  // useEffect(() => {
  //     // eslint-disable-next-line
  //     jwt.updateSmsSending({ smsSending: smsSwitch })
  //         // eslint-disable-next-line
  //         .then((res) => { })
  //         // eslint-disable-next-line
  //         .catch((err) => { });
  // }, [smsSwitch]);

  const handleChange = (event) => {
    setSmsSwitch(event.target.checked);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const sendExpiryAlert = () => {
    jwt
      .sendExpiryAlert()
      // eslint-disable-next-line
      .then((res) => {
        alert("Expiry Alert Sent");
        getSmsBalance();
      })
      // eslint-disable-next-line
      .catch((err) => toast.error(err));
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      <SearchSection
        filters={filters}
        data={data}
        setFilteredData={setFilteredData}
      />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <div style={{ display: "flex" }}>
        <Typography sx={{ mr: 0.5, color: THEME_COLOR_DARK }}>
          SMS Balance:{" "}
        </Typography>
        <Typography sx={{ mr: 1, color: smsBalance < 100 ? "red" : "green" }}>
          {smsBalance}
        </Typography>
      </div>
      {/* {jwt.getUser()?.type === STAFF_TYPES.admin && (
                <>
                    <FormLabel>SMS Sending</FormLabel>
                    <Switch checked={smsSwitch} onChange={handleChange} name="checked" inputProps={{ 'aria-label': 'controlled' }} />
                </>
            )} */}
      <Button
        variant="contained"
        sx={{ mr: 2, color: "white" }}
        onClick={handleOpenModal}
      >
        Send Message
      </Button>
      <Button
        variant="contained"
        sx={{ mr: 2, color: "white" }}
        onClick={sendExpiryAlert}
      >
        Expiry Alert Message
      </Button>
      <ProfileSection />
      <CustomMessageModal open={showModal} handleClose={handleCloseModal} />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
