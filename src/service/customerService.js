import axios from "axios";

// פעולה לרישום
export const postCustomer = async (customer) => {
    const response = await axios.post("http://localhost:8080/api/customer/signup", customer);
    return response.data;
};

// פעולה לכניסה
export const loginCustomer = async (loginData) => {
    const response = await axios.post("http://localhost:8080/api/customer/login", loginData);
    return response.data;
};


// export const getAllCustomers = async () => {
//     const response = await axios.get("http://localhost:8080/api/customer/all");
//     return response.data;
// };

