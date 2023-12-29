import "../NavBar.css";
import { Box, Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import useAuthContainer from "./useAuthContainer";

const AuthContainer = ({ isLogin, user }) => {
  const {
    handleCreateProduct,
    handleMyProducts,
    handleSignOutButton,
    handleMouseEnter,
    handleMouseLeave,
    handleSignInButton,
    showDropdown,
    handleEditProfile,
    handleChangePassword,
  } = useAuthContainer();

  return (
    <>
      <Box
        className="navbar_signin"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          border: showDropdown ? "1px solid white" : "none",
          position: "relative",
        }}
        // onFocus={handleFocus}
        tabIndex="0"
      >
        <Box>
          <Typography
            fontSize={{ xs: "6px", sm: "4px", md: "12.5px", lg: "12.5px" }}
          >
            Hellow, {user ? user.name : "sign in"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          <Typography
            fontSize={{ xs: "7px", sm: "10px", md: "12.5px", lg: "15px" }}
            fontWeight={"bold"}
          >
            Accounts & Lists
          </Typography>
        </Box>
        {showDropdown && (
          <Box
            padding={"10px"}
            marginTop={"7px"}
            display={"block"}
            width={"300px"}
            color={"black"}
            backgroundColor="whitesmoke"
          >
            {isLogin ? (
              <>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  <Button
                    sx={{
                      width: {
                        xs: "80px",
                        sm: "200px",
                        md: "300px",
                      },
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "skyblue",
                      marginTop: "10px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "black",
                      },
                    }}
                    onClick={handleSignOutButton}
                  >
                    SignOut
                  </Button>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box onClick={() => handleEditProfile(user)}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user.imageUrl}
                        sx={{
                          backgroundColor: "red",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                    <Typography fontSize={18} ml={2} fontWeight={600}>
                      {user.name}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      minWidth: "250px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "skyblue",
                      marginTop: "10px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "black",
                      },
                    }}
                    onClick={handleCreateProduct}
                  >
                    createProduct
                  </Button>

                  <Button
                    sx={{
                      minWidth: "250px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "skyblue",
                      marginTop: "10px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "black",
                      },
                    }}
                    onClick={handleMyProducts}
                  >
                    My All Products
                  </Button>
                  <Button
                    sx={{
                      minWidth: "250px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "skyblue",
                      marginTop: "10px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "black",
                      },
                    }}
                    onClick={() => handleChangePassword(user)}
                  >
                    Change Password
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box display={"flex"} justifyContent={"center"}>
                  <Button
                    sx={{
                      minWidth: "250px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "skyblue",
                      marginTop: "10px",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "black",
                      },
                    }}
                    onClick={handleSignInButton}
                  >
                    SignIn
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
export default AuthContainer;
