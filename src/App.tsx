import { PaymentForm } from "./components/payment-form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccountProvider } from "./contexts/account-context";
import { payerAccounts } from "./components/schemas/payer-accounts";
import { AccountHelper } from "./components/account-helper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <div className="h-screen w-screen p-8">
      <AccountProvider accounts={payerAccounts}>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AccountHelper />
            <div className="h-full flex items-center justify-center">
              <PaymentForm />
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </AccountProvider>
    </div>
  );
};

export default App;
