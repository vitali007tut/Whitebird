export const title = {
  height: "30px",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "17px",
};

export const card = {
  background: "#1e1e1e",
  padding: "5px 15px",
  marginBottom: "5px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const paper = {
  color: "#fff",
  background: "#1e1e1e",
  padding: "10px 20px",
  marginTop: "25px",
};

export const commentsContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr 1fr",
  gridColumnGap: "10px",
  marginTop: "10px",
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

export const paginationItem = {
  "&.MuiPaginationItem-root": {
    color: "#fff",
  },
  "&.MuiPaginationItem-page": {
    color: "#fff",
  },
  "&.Mui-selected": { backgroundColor: "#1976d2", color: "#fff" },
  "&.MuiPaginationItem-page:hover": {
    backgroundColor: "lightblue",
    color: "#000",
  },
};
