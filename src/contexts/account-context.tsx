import type { PayerAccount } from "@/components/schemas/payer-accounts";
import type { PaymentForm } from "@/components/schemas/payment-form-schema";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AccountContextType {
  locale: string;
  setLocale: (locale: string) => void;
  currentAccount: PayerAccount | null;
  setCurrentAccount: (account: PayerAccount | null) => void;
  accounts: PayerAccount[];
  processPayment: (p: PaymentForm) => void;
  payments: PaymentForm[];
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{
  accounts: PayerAccount[];
  children: ReactNode;
}> = ({ children, accounts: initialAccounts }) => {
  const [locale, setLocale] = useState<string>("en");
  const [currentAccount, setCurrentAccount] = useState<PayerAccount | null>(
    null
  );
  const [accounts, setAccounts] = useState<PayerAccount[]>(initialAccounts);
  const [payments, setPayments] = useState<PaymentForm[]>([]);

  const processPayment = (p: PaymentForm) => {
    const { payerAccountIBAN, payeeAccountIBAN, paymentAmount } = p;

    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.map((acc) => {
        if (acc.iban === payerAccountIBAN) {
          return {
            ...acc,
            balance: acc.balance - paymentAmount,
          };
        }

        if (acc.iban === payeeAccountIBAN) {
          return {
            ...acc,
            balance: acc.balance + paymentAmount,
          };
        }

        return acc;
      });

      // Find and update current account from the newly updated accounts
      const updatedCurrent = updatedAccounts.find(
        (acc) => acc.iban === payerAccountIBAN
      );

      if (updatedCurrent) {
        setCurrentAccount({ ...updatedCurrent });
      }

      return updatedAccounts;
    });

    setPayments((prevPayments) => [...prevPayments, p]);
  };

  return (
    <AccountContext.Provider
      value={{
        locale,
        setLocale,
        currentAccount,
        setCurrentAccount,
        accounts,
        processPayment,
        payments,
      }}
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
