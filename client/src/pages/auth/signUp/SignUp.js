import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useMemo, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import useAuth from "../../../components/hooks/useAuth";
import {
  selectLoading,
  setPreviousRoute,
} from "../../../redux/slicers/authSlice";
import InputField from "../../../components/reuseableComponents/InputField";
import Header from "../../../components/reuseableComponents/Header";
import { signUpPageData } from "../../../components/constant/data/signUpPageData";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSignUp from "./useSignUp";
import useStates from "../../../components/hooks/useStates";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

const initialState = {
  firstName: "",
  lastName: "",
  name: "",
  dob: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  recoveryEmail: "",
  tc: false,
  photo: "",
  country: "",
  zipCode: "",
};

const SignUp = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [credentials, setCredentials] = useState(initialState);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [checked, setChecked] = useState(true);
  const loading = useSelector(selectLoading);
  let { userId, token } = useParams();
  const { setVal } = useSignUp();
  const { user } = useStates();
  // ...
  // const data = {
  //   userId: userId,
  //   token: token,
  // };
  console.log(credentials);
  useEffect(() => {
    if (userId) {
      // Get user data stored in redux state and store it in initial state
      setCredentials({
        ...credentials,
        ...user,
      });
    }
  }, [userId]);
  const options = useMemo(() => countryList().getData(), []);

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedImage(acceptedFiles[0]);
    }
  };

  const handleImageUpload = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      //Export as Blob
      canvas.toBlob((blob) => {
        setCredentials({ ...credentials, photo: blob });
      }, "image/jpeg");
      // console.log("Canvas", canvas);
      // const dataURL = canvas.toDataURL("image/jpeg");
      // // You can send the dataURL to your server or do further processing here.
      // setCredentials({ ...credentials, photo: dataURL });
      // console.log(dataURL);
    } else {
      // console.log("Avatar editor not ready.");
    }
  };
  const { signUpHandler, updateUserHandler } = useAuth();
  const handleSignUp = () => {
    const {
      zipCode,
      photo,
      email,
      firstName,
      password,
      lastName,
      confirmPassword,
      tc,
      country,
      age,
      recoveryEmail,
      dob,
    } = credentials;
    if (
      !email ||
      !password ||
      !firstName ||
      !confirmPassword ||
      !lastName ||
      !tc ||
      !dob ||
      !country ||
      !recoveryEmail ||
      password !== confirmPassword
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
    } else {
      // const credentials = {
      //   email: email,
      //   password: password,
      // };
      setCredentials({
        ...credentials,
        name: credentials.firstName + " " + credentials.lastName,
      });

      const locationPath = window.location.pathname;
      signUpHandler(credentials, locationPath);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }
  };
  const handleUpdateUser = () => {
    setCredentials({
      ...credentials,
      name: credentials.firstName + " " + credentials.lastName,
      token: token,
    });

    const locationPath = window.location.pathname;
    updateUserHandler(credentials, locationPath);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const handleCloseAlert = () => {
    setShowError(false);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
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
            height: "auto",
            width: "80%",
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
                {userId ? "update form" : "Welcome to our SignUp Page"}
              </Typography>
              <Box
                mt={4}
                width={"600px"}
                textAlign={"left"}
                justifyContent={"space-between"}
              >
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
                <Box display={"flex"}>
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Header tag={"First Name"} />
                    <InputField
                      value={credentials.firstName}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box margin="0px 0px 0px 20px">
                    <Header tag="Last Name" />
                    <InputField
                      value={credentials.lastName}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Enter your lastname"
                    />
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Header tag={"Email"} />
                    <InputField
                      value={credentials.email}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          email: e.target.value,
                        })
                      }
                      placeholder={"enter email u want to use"}
                    />
                  </Box>
                  <Box margin="0px 0px 0px 20px">
                    <Header tag="Recovery Email" />
                    <InputField
                      value={credentials.recoveryEmail}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          recoveryEmail: e.target.value,
                        })
                      }
                      placeholder="Enter your recoveryEmail address"
                    />
                  </Box>
                </Box>
                <Box display={userId ? "none" : "flex"}>
                  <Box>
                    <Header tag="Password" />
                    <InputField
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      type="password"
                    />
                  </Box>
                  <Box margin="0px 0px 0px 20px">
                    <Header tag="Confirm Password" />
                    <InputField
                      value={credentials.confirmPassword}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      type="password"
                    />
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box
                    display={userId ? "none" : "flex"}
                    sx={{
                      flexGrow: 1,
                      minWidth: "500px",
                    }}
                  >
                    <Header tag={"Country"} />
                    <Select
                      className="react-select"
                      options={options}
                      value={options.find(
                        (option) => option.label === credentials.country
                      )}
                      onChange={(value) =>
                        setCredentials({
                          ...credentials,
                          country: value.label,
                        })
                      }
                    />
                  </Box>
                  <Box
                    margin="0px 0px 0px 20px"
                    display={userId ? "none" : "flex"}
                  >
                    <Header tag="ZipCode" />
                    <InputField
                      value={credentials.zipCode}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          zipCode: parseInt(e.target.value, 10),
                        })
                      }
                      type="number"
                      placeholder="Enter your zipCode"
                    />
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box
                    display={userId ? "none" : "flex"}
                    sx={{
                      flexGrow: 1,
                      minWidth: "500px",
                    }}
                  >
                    <FormControl>
                      <Header tag={"Gender"} />
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={credentials.gender}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            gender: e.target.value,
                          })
                        }
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>{" "}
                  </Box>
                  <Box
                    display={userId ? "none" : "block"}
                    margin="0px 0px 0px 20px"
                  >
                    <Header tag="Age" />
                    <InputField
                      value={credentials.dob}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          dob: e.target.value,
                        })
                      }
                      type={"date"}
                      placeholder="Enter your age"
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                mt={4}
                width="300px"
                height="250px"
                textAlign="left"
                justifyContent="space-between"
              >
                <Dropzone onDrop={handleImageDrop} accept="image/*">
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {uploadedImage ? (
                        <AvatarEditor
                          ref={(editor) => setEditor(editor)}
                          image={uploadedImage}
                          width={200}
                          height={200}
                          border={10}
                          scale={1.2}
                        />
                      ) : (
                        <Button
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload file
                        </Button>
                      )}
                    </div>
                  )}
                </Dropzone>
              </Box>
              <Box mt={4} display={"flex"} justifyContent="space-between">
                <Button
                  variant="contained"
                  onClick={handleImageUpload}
                  sx={{
                    width: "200px",
                  }}
                >
                  Upload Image
                </Button>
              </Box>
              <Box display={userId ? "none" : "flex"} alignItems={"center"}>
                <Checkbox
                  checked={credentials.tc}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      tc: !credentials.tc,
                    })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Header tag={"Accept terms and conditions"} />
              </Box>
              <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                {/* <Button
                  variant="contained"
                  onClick={userId ? handleUpdateUser : handleSignUp}
                  sx={{
                    width: "200px",
                  }}
                >
                  Submit
                </Button> */}
                <LoadingButton
                  color="secondary"
                  onClick={userId ? handleUpdateUser : handleSignUp}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  {userId ? <span>Update</span> : <span> Submit</span>}
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
