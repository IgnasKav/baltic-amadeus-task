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
      <div className="mt-2 bg-gray-600 rounded-lg p-2">
        Payments can be made only from the listed accounts. If payment is made
        to one of these accounts, the balance will update accordingly.
      </div>
    </div>
  );
};
