import axios from "axios";

export const sendMail = async (mailData) => {
  try {
    const response = await axios.post('http://localhost:8080/sendMail', mailData)
    return response.data;
  } catch (error) {
    console.log(error,'err');
  }
}