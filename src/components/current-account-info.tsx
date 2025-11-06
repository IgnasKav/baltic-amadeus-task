import { useAccount } from "@/contexts/account-context";
import { cn } from "@/lib/util";

export const CurrentAccountInfo = () => {
  const { currentAccount } = useAccount();
  return (
    <div className="p-4 border rounded-lg mt-4">
      {currentAccount ? (
        <div>
          <div>Current account: {currentAccount.iban}</div>
          <div className="flex gap-2">
            Account balance:{" "}
            <div
              className={cn(
                "font-bold",
                { "text-red-600": currentAccount.balance < 0 },
                { "text-green-600": currentAccount.balance >= 0 }
              )}
            >
              {currentAccount.balance}
            </div>
          </div>
        </div>
      ) : (
        <div>No account selected</div>
      )}
    </div>
  );
};
