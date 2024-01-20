import React from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const SuccessPayment = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CheckCircleIcon color="success" style={{ fontSize: 100 }} />
      <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        align="center"
        paragraph
      >
        Thank you for your purchase. Your payment has been successfully
        processed.
      </Typography>
      <Button variant="contained" color="primary">
        Continue Shopping
      </Button>
    </Box>
  );
};

export default SuccessPayment;
