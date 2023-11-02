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
import { useParams } from "react-router-dom";

const ForgetPassword = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { forgotPassword } = useAuth();
  const { userId, token } = useParams();
  console.log("USER ID AND TOKEN", userId, token);

  // const theme = useTheme();
  const handleSignIn = () => {
    if (!confirmNewPassword || !newPassword) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } else {
      const data = {
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
        userId: userId,
        token: token,
      };

      const locationPath = window.location.pathname;
      forgotPassword(data, locationPath);
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
      {showSuccess && (
        <Alert severity="success">Congrats you are successfully signedIn</Alert>
      )}
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
                Plz set new password
              </Typography>
              <Box mt={4} width={"300px"} textAlign={"left"}>
                <Header tag={"Enter your new password"} />
                <InputField
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your New password"
                  type="password"
                />
                <Header tag="Re confirm password again" />
                <InputField
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Enter your password New Again"
                  type="password"
                />
              </Box>

              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  onClick={handleSignIn}
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

export default ForgetPassword;
