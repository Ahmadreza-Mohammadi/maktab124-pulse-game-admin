import { ACCESS_TOKEN  } from "./api";



export const isLogin = () => {
  if (ACCESS_TOKEN) {
    return true;
  } else {
    return false;
  }
};
