import { BrowserRouter } from "react-router";
import Header from "./components/header/Header";
import AsideMenu from "./components/aside-bar/AsideMenu";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AsideMenu />
      </BrowserRouter>
    </>
  );
}

export default App;
