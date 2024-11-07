import axiosInstance from './client';

export const fetchData = async (): Promise<ProductResponse> => {
    const response = await axiosInstance.get<ProductResponse>("/products");
    return response.data;
  };