import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import useAuth from "../../../components/hooks/useAuth";
import { setPreviousRoute } from "../../../redux/slicers/authSlice";
import InputField from "../../../components/reuseableComponents/InputField";
import Header from "../../../components/reuseableComponents/Header";

const SendPasswordRecoveryEmail = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const { recoverPasswordEmail } = useAuth();

  // const theme = useTheme();
  const handleSubmit = () => {
    if (!email) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } else {
      const locationPath = window.location.pathname;
      recoverPasswordEmail(email);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }
  };
  const handleCloseAlert = () => {
    setShowError(false);
  };

  return (
    <>
      {showError && (
        <Alert
          severity="error"
          action={<Button onClick={handleCloseAlert}>OK</Button>}
        >
          Please fill out all fields before Submit.
        </Alert>
      )}
      {showSuccess && <Alert severity="success">Please check your email</Alert>}
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          className="mainPage"
          style={{
            height: "500px",
            width: "600px",
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "10px",
            padding: "4px",
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
            boxShadow: "0 11px 21px 0 rgba(34,90,182,.12)",
          }}
        >
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Box mt={2}>
              <Typography
                variant="h5"
                component="h2"
                color={"#49515A"}
                fontWeight={600}
              >
                Please enter your recovery Email
              </Typography>
              <Box mt={4} width={"300px"} textAlign={"left"}>
                <Header tag={"Enter your new password"} />
                <InputField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your recovery Email"
                />
              </Box>

              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    width: "200px",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SendPasswordRecoveryEmail;
