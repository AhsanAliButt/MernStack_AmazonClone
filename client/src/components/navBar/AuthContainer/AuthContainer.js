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
        <Box
          style={{
            fontSize: "14px",
          }}
        >
          Hellow, {user ? user.name : "sign in"}
        </Box>
        <Box
          style={{
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Accounts & Lists
        </Box>
        {showDropdown && (
          <Box
            style={{
              backgroundColor: "whitesmoke",
              color: "black",
              width: "300px",
              display: "block",
              marginTop: "7px",
              padding: "10px",
            }}
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
