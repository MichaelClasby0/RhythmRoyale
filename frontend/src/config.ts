export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://rhythm-royale.herokuapp.com"
    : "http://localhost:5000";
