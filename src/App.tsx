import { PaymentForm } from "./components/payment-form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <div className="h-screen w-screen p-8">
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className="h-full flex items-center justify-center">
            <PaymentForm />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
