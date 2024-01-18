import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
}); // create an axios instance

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((response) => response.data);
  };

  getOne = (id: string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((response) => response.data);
  };

  post = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((response) => response.data);
  };

  put = (id: string, data: T) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data)
      .then((response) => response.data);
  };

  delete = (id: string) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`)
      .then((response) => response.data);
  };
}

export default APIClient;
