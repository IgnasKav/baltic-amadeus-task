import type { PayerAccount } from "@/components/schemas/payer-accounts";
import type { PaymentForm } from "@/components/schemas/payment-form-schema";
import type { Translations } from "@/translations/en";
import {
  translations as allTranslations,
  type Locale,
} from "@/translations/translations";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AccountContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Translations;
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
  const [locale, setLocale] = useState<Locale>("en");
  const [currentAccount, setCurrentAccount] = useState<PayerAccount | null>(
    null
  );
  const [accounts, setAccounts] = useState<PayerAccount[]>(initialAccounts);
  const [payments, setPayments] = useState<PaymentForm[]>([]);

  const [translations, setTranslations] = useState<Translations>(
    allTranslations[locale]
  );

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

  const handleLocaleChange = (locale: Locale) => {
    setLocale(locale);
    setTranslations(allTranslations[locale]);
  };

  return (
    <AccountContext.Provider
      value={{
        locale,
        setLocale: handleLocaleChange,
        translations,
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
