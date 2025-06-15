import axios from "axios";
import { BACKEND_URL } from "../config/app.config";

const AUTH_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/auth/login`,
  SIGNUP: `${BACKEND_URL}/auth/signup`,
};

export const loginUser = async (payload) => {
  const response = await axios.post(AUTH_ENDPOINTS.LOGIN, payload);
  return response.data;
};

export const signupUser = async (payload) => {
  const response = await axios.post(AUTH_ENDPOINTS.SIGNUP, payload);
  return response.data;
};
