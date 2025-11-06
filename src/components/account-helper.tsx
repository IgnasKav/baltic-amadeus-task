import { useAccount } from "@/contexts/account-context";

export const AccountHelper = () => {
  const { accounts } = useAccount();
  return (
    <div className="p-4 border rounded-lg">
      Available payer accounts:
      <div className="mt-2 flex gap-2">
        {accounts.map((account) => (
          <div key={account.id}>
            <div>{account.iban}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
