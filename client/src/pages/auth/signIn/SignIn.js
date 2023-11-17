import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import InputField from "../../../components/reuseableComponents/InputField";
import Header from "../../../components/reuseableComponents/Header";
import { routes } from "../../../components/constant/routes";
import useSignIn from "./useSignIn";
import LoadingButton from "@mui/lab/LoadingButton";
import useStates from "../../../components/hooks/useStates";
const SignIn = () => {
  const {
    email,
    password,
    handleSignIn,
    handleCloseAlert,
    handleSetEmail,
    handleSetPassword,
    showError,
    showSuccess,
  } = useSignIn();
  const { authLoading } = useStates();

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
      {showSuccess && <Alert severity="success"> Please wait </Alert>}
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
                  value={email}
                  onChange={(e) => handleSetEmail(e.target.value)}
                />
                <Header tag="Password" />
                <InputField
                  value={password}
                  onChange={(e) => handleSetPassword(e.target.value)}
                  placeholder="Enter your password"
                  type="password"
                />
              </Box>

              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                <Link to={routes.signUp}>SignUp</Link>
                <Link to={routes.sendRecoveryEmail}>Forgot Password</Link>

                <LoadingButton
                  color="secondary"
                  onClick={handleSignIn}
                  loading={authLoading}
                  loadingPosition="start"
                  variant="contained"
                >
                  Sign In
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
