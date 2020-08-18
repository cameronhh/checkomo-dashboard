import axios from "axios";


export const postSignUp = async (userData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/user`,
    userData,
  );

  console.log("result", res.data)
}