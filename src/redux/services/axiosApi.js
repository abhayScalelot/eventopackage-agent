import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

export const apiInstance = axios.create({
  baseURL: baseUrl,
});
apiInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// apiInstance.interceptors.response.use(
//   function (response) {
//     return response.data;
//   },
//   function (error) {
//     console.log(error, "Axios Error ==");
//     if (!error?.response?.data?.message) {
//       DangerRight('Something went Wrong!')
//     }
//     if (error?.response?.data?.code === 'E_USER_NOT_FOUND') {
//     }

//     if (typeof error?.response?.data?.message === "string") {
//       DangerRight(error.response.data.message);
//     } else {
//       for (let i = 0; i < error?.response?.data?.message?.length; i++) {
//         DangerRight(error.response.data.message[i]);
//       }
//       return Promise.reject(error);
//     }
//   }
// );
