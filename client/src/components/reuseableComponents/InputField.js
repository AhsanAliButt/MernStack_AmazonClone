import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
const InputField = ({
  width,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
      }}
    >
      <InputBase
        sx={{
          border: "1px solid black",
          borderRadius: "6px",
          marginTop: "8px",
          padding: "8px",
          width: width || "500px",
        }}
        placeholder={placeholder || "please enter a username"}
        defaultValue={value || "Please enter a username"}
        type={type || "text"}
        autoComplete={autoComplete || true}
        value={value}
        fullWidth
        onChange={onChange}
      />
    </Box>
  );
};

export default InputField;
