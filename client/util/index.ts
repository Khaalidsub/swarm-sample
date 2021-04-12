import Axios from "axios";

export const axios = Axios.create({
  baseURL: " https://jsonplaceholder.typicode.com",
});

export const imageApi = Axios.create({
  baseURL: "https://picsum.photos/v2",
});
