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
import { signUpPageData } from "../../components/constant/data/signUpPageData";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  recoveryEmail: "",
  tc: "",
  photo: "",
};

const SignUp = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [credentials, setCredentials] = useState(initialState);
  const { signUpHandler } = useAuth();
  console.log("credentials", credentials);
  const handleSignUp = () => {
    const { email, firstName, password } = credentials;
    console.log(email, password);
    if (!email || !password) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } else {
      const credentials = {
        email: email,
        password: password,
      };

      const locationPath = window.location.pathname;
      signUpHandler(credentials, locationPath);
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
                {/* {signUpPageData.map((data) => {
                  return (
                    <>
                      <Header tag={data.tag} />
                      <InputField
                        value={data.value}
                        onChange={data.onChange}
                        placeholder={data.placeholder}
                        type={data.type ? data.type : "text"}
                      />
                    </>
                  );
                })} */}
                <Header tag={"Username"} />
                <InputField
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                <Header tag="Password" />
                <InputField
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  type="password"
                />
              </Box>

              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  onClick={handleSignUp}
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

export default SignUp;
