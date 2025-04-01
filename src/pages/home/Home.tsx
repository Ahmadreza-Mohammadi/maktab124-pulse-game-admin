import welcomeImg from "../../assets/imgs/home-pic.png";

function Home() {
  return (
    <div className="bg-gray-700 w-full h-screen flex justify-center items-center transition-all duration-500 pr-80">
      <div className="home-container flex flex-col items-center gap-8 p-10 bg-gray-800/90 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:scale-105 hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] transition-all duration-300">
        <img
          className="h-80 w-auto rounded-lg object-cover transform hover:rotate-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] transition-all duration-500"
          src={welcomeImg}
          alt="Welcome to Pulse Gaming"
        />
        <p className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 drop-shadow-lg tracking-wide animate-pulse">
          به پنل ادمین پالس گیم خوش آمدید!
        </p>
      </div>
    </div>
  );
}

export default Home;