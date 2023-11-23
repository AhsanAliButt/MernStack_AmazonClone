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
import { Grid } from "@mui/material";
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          height: "60vh",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Box
            className="mainPage"
            sx={{
              backgroundColor: "rgb(245, 245, 245)",
              borderRadius: "10px",
              p: "4px",
              display: "flex",
              justifyContent: "center",
              height: "400px",

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
                  color="#49515A"
                  fontWeight={600}
                >
                  Welcome to our SignIn Page
                </Typography>
                <Box mt={4} width="100%" textAlign="left">
                  <Header tag="Username" />
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

                <Box mt={4} display="flex" justifyContent="space-between">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width={"200px"}
                    flexDirection={{ xs: "column", sm: "row", md: "row" }}
                  >
                    <Link to={routes.signUp}>SignUp</Link>
                    <Link to={routes.sendRecoveryEmail}>Forgot Password</Link>
                  </Box>

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
                <Typography textAlign={"center"} fontWeight={700} mt={4} mb={2}>
                  {" "}
                  OR{" "}
                </Typography>
                <LoadingButton
                  color="secondary"
                  onClick={handleSignIn}
                  loading={authLoading}
                  loadingPosition="start"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: "10px" }}
                >
                  {/* < src={"./"} /> */}
                  {/* <img
                    
                    alt="Google Icon"
                    style={{
                      marginRight: "8px",
                      width: "24px",
                      height: "24px",
                    }} // Adjust the width and height as needed
                  /> */}
                  <Typography textTransform={"initial"}>
                    Login with Google
                  </Typography>
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
