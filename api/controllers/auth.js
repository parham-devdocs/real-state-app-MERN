import bcrypt from "bcrypt";

export const register = (req, res) => {
    const { username, email, password } = req.body
    
}
export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};