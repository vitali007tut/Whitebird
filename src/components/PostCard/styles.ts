export const card = {
  background: "#1e1e1e",
  color: "#fff",
  padding: "5px 15px",
  borderRadius: "5px",
  width: "80%",
  margin: "0 auto",
};

export const comment = {
  marginBottom: '10px',
  display: 'flex',
  gap: '5px'
};

export const paper = {
  color: "#fff",
  background: "#282c34",
  padding: "10px 20px",
};

export const content = {
  display: "flex",
  flexDirection: "column",
  rowGap: "20px",
};

export const commentsContainer = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 3fr 1fr',
  gridColumnGap: '10px'
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
