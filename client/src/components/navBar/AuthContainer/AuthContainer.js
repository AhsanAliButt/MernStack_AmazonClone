import "../NavBar.css";
import { Box, Button } from "@mui/material";
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
  } = useAuthContainer();
  return (
    <>
      <Box
        className="navbar_signin"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          border: showDropdown ? "1px solid white" : "none",
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
              backgroundColor: "wheat",
              color: "black",
              width: "400px",
              display: "block",
              position: "absolute",
              left: "1550.516px",
              padding: "10px",
            }}
          >
            {isLogin ? (
              <>
                <Button onClick={handleSignOutButton}>SignOut</Button>
                <Avatar alt="Remy Sharp" src={user.imageUrl} />
                <Button
                  sx={{
                    minWidth: "150px",
                    borderRadius: "5px",
                    color: "white",
                    backgroundColor: "black",
                    marginTop: "10px",
                  }}
                  onClick={handleCreateProduct}
                >
                  createProduct
                </Button>
                <Box>
                  <Button
                    sx={{
                      minWidth: "150px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "black",
                      marginTop: "10px",
                    }}
                    onClick={handleMyProducts}
                  >
                    My All Products
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    minWidth: "150px",
                    borderRadius: "5px",
                    color: "white",
                    backgroundColor: "black",
                    marginTop: "10px",
                  }}
                  onClick={handleSignInButton}
                >
                  SignIn
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
export default AuthContainer;
