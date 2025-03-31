function Header() {
  return (
    <div className="text-white p-20 flex justify-between navbar">
      <div className="flex items-center gap-4">
        <img
          className="h-20 cursor-pointer"
          src="https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg"
          alt=""
        />
        <img className="h-16 cursor-pointer" src="https://www.svgrepo.com/show/212422/pencil-edit.svg" alt="" />
      </div>
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
