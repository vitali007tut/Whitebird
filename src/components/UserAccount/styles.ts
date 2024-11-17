export const form = {
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "50%",
};

export const field = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": { borderColor: "#1976b4" },
    "& input": { color: "#fff" },
  },
  "& .MuiInputLabel-root": { color: "#fff" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#1976b4" },
};
