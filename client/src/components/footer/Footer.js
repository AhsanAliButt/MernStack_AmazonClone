import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "auto",
        backgroundColor: "#EBE3D5",
        paddingY: 2,
        height: {
          sm: "200px",
          md: "300px",
        },
      }}
      maxWidth="100%"
    >
      <Typography variant="h6" align="center" gutterBottom>
        Connect with Us
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <IconButton
          color="primary"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          color="primary"
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="primary"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton color="primary" href="mailto:example@example.com">
          <EmailIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
