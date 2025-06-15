import { toast } from "react-toastify";

export const showError = (err) => {
  const errorMessage = err?.response?.data?.message || err.message;
  toast.error(errorMessage);
};

export const getRandomBgColor = () => {
  const avatarColors = [
    "#FFC107",
    "#03A9F4",
    "#4CAF50",
    "#E91E63",
    "#9C27B0",
    "#FF5722",
    "#607D8B",
  ];

  const index = Math.floor(Math.random() * avatarColors.length);
  return avatarColors[index];
};

export const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
