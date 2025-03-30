function Header() {
  return (
    <div className="bg-[#262626] text-white p-4 flex justify-between">
      <div>profile</div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-2xl">پنل ادمین پالس گیم</span>
        <img
          className="h-24"
          src="https://www.svgrepo.com/show/232843/game-console-gamepad.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
