import { PaymentForm } from "./components/payment-form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <div className="h-screen w-screen">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="h-full flex items-center justify-center">
          <PaymentForm />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
