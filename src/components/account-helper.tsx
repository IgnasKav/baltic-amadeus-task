import { useAccount } from "@/contexts/account-context";

export const AccountHelper = () => {
  const { accounts, translations } = useAccount();
  return (
    <div className="p-4 border rounded-lg">
      {translations.accountsInfoBanner.title}
      <div className="mt-2 flex flex-wrap gap-2">
        {accounts.map((account) => (
          <div key={account.id}>{account.iban}</div>
        ))}
      </div>
      <div className="mt-2 bg-gray-600 rounded-lg p-2">
        {translations.accountsInfoBanner.note}
      </div>
    </div>
  );
};
