import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import useAuth from "../../components/hooks/useAuth";
import { setPreviousRoute } from "../../redux/slicers/authSlice";
import InputField from "../../components/reuseableComponents/InputField";
import Header from "../../components/reuseableComponents/Header";

const SignIn = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginHandler } = useAuth();

  // const theme = useTheme();
  const handleSignIn = () => {
    if (!username || !password) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } else {
      const credentials = {
        email: username,
        password: password,
      };

      const locationPath = window.location.pathname;
      loginHandler(credentials, locationPath);
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
          Please fill out all fields before signIn.
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
                Welcome to our SignIn Page
              </Typography>
              <Box mt={4} width={"300px"} textAlign={"left"}>
                <Header tag={"Username"} />
                <InputField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Header tag="Password" />
                <InputField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type="password"
                />
              </Box>

              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                <Link to="/signUp">SignUp</Link>

                <Button
                  variant="contained"
                  onClick={handleSignIn}
                  sx={{
                    width: "200px",
                  }}
                >
                  SignIn
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
