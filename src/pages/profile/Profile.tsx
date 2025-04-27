import {
  ACCESS_TOKEN,
  API_KEY,
  BASE_URL,
} from "../../components/api/api";
import axios from "axios";

function Profile() {
  const getUserData = async () => {
    const res = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        api_key: API_KEY,
        "Content-Type": "application/json",
      },
    });

    const user = await res.data;
    localStorage.setItem("username", JSON.stringify(user.name));
  };
  getUserData();
  return (
    <div className="w-full min-h-screen bg-gray-700 flex flex-col items-center p-4 mr-80"></div>
  );
}

export default Profile;
