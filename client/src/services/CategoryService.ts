import axiosInstance from "../interceptors/TokenInterceptor";

export const getCategories = () => {
  // Example of using axiosInstance for an API call
  axiosInstance
    .get("/category")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
