import { BACKEND_URL } from "../config/app.config";
import { httpClient } from "../helpers/httpClient";

const USER_ENDPOINTS = {
  USERS: `${BACKEND_URL}/users`,
};

export const getAllUsers = async (payload) => {
  const response = await httpClient.get(USER_ENDPOINTS.USERS, {
    params: { search: payload },
  });
  return response.data;
};
