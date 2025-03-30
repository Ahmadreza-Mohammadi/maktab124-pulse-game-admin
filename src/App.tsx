import { BrowserRouter } from "react-router";
import Header from "./components/header/Header";
import { pages } from "./components/constants/const";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="bg-red-400 w-84 h-screen">
          <ul>
            {pages.map((page:any) => (
              <li key={page.name}>{page.name}</li>
            ))}
          </ul>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
