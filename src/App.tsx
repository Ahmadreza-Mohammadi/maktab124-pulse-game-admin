import { BrowserRouter } from "react-router";
import Routing from "./router/routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
