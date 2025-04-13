import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../components/api/api";
import { useNavigate } from "react-router";
import { routes } from "../../router/const";
import { emailRegex } from "../../components/constants/const";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [fadeIn, setFadeIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  const validateInput = () => {
    if (!emailRegex.test(email)) {
      setError("ایمیل وارد شده معتبر نیست.");
      return false;
    }
    if (!password) {
      setError("ایمیل یا رمزعبور اشتباه است.");
      return false;
    }
    setError("");
    return true;
  };

  const loginHandler = async () => {
    if (!validateInput()) {
      return;
    }
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
      setError("ایمیل یا رمزعبور اشتباه است.");
      throw error;
    }
  };

  return (
    <div
      className={`bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen flex justify-center items-center transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="flex flex-col items-center justify-between py-8 px-10 bg-gray-800 rounded-xl shadow-lg w-[600px] transition-transform duration-700 transform scale-90"
        style={{
          transform: fadeIn ? "scale(1)" : "scale(0.9)",
        }}
      >
        <div className="text-center mb-6">
          <h1 className="text-white text-3xl font-bold tracking-wide mb-2 animate-fade-in">
            پنل ادمین پالس گیم
          </h1>
          <h2 className="text-gray-400 text-lg font-medium animate-fade-in">
            لطفا وارد شوید
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-full animate-fade-in">
          <input
            className="p-3 bg-gray-200 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:shadow-md hover:border-gray-500"
            placeholder="ایمیل"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="p-3 bg-gray-200 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:shadow-md hover:border-gray-500"
            placeholder="رمز عبور"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && (
            <span className="text-red-500 text-sm text-center">{error}</span>
          )}
          <button
            onClick={loginHandler}
            className="py-3 px-6 w-full bg-cyan-600 text-white rounded-md hover:bg-cyan-700 active:bg-cyan-800 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          >
            ورود
          </button>
          <a
            href="/forgot-password"
            className="text-cyan-400 text-sm text-center hover:underline cursor-pointer transition-opacity duration-300 hover:opacity-80"
          >
            فراموشی رمز عبور؟
          </a>
          <a
            href="/help"
            className="text-cyan-400 text-sm text-center hover:underline cursor-pointer transition-opacity duration-300 hover:opacity-80"
          >
            راهنما
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
