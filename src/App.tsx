import { BrowserRouter } from "react-router";
import MyChart from "./components/chart/Chart";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyChart />
      </BrowserRouter>
    </>
  );
}

export default App;
