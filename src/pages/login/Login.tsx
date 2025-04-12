import { useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../components/api/api";
import { useNavigate } from "react-router";
import { routes } from "../../router/const";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/login`,
        { email, password },
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate(routes.home);
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-6 p-8 bg-gray-800 rounded-xl shadow-2xl w-[520px]">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          ورود به پنل ادمین
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <input
            className="p-4 bg-gray-200 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:shadow-lg hover:border-gray-500"
            placeholder="ایمیل"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="p-4 bg-gray-200 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:shadow-lg hover:border-gray-500"
            placeholder="رمز عبور"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={() => loginHandler(email, password)}
            className="p-4 w-full bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 active:bg-cyan-800 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          >
            ورود
          </button>
          <button className="p-3 w-full bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-transform duration-300 transform hover:scale-105 cursor-pointer">
            راهنما
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
