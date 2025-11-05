import type { PayerAccount } from "@/components/schemas/payer-accounts";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AccountContextType {
  locale: string;
  setLocale: (locale: string) => void;
  currentAccount: PayerAccount | null;
  setCurrentAccount: (account: PayerAccount | null) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [locale, setLocale] = useState<string>("en");
  const [currentAccount, setCurrentAccount] = useState<PayerAccount | null>(
    null
  );

  return (
    <AccountContext.Provider
      value={{ locale, setLocale, currentAccount, setCurrentAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
