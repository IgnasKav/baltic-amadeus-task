import { defaultValues, withForm } from "@/forms/form-config";
import { useQueryClient } from "@tanstack/react-query";
import { ibanValidation } from "../schemas/payment-form-schema";
import { useAccount } from "@/contexts/account-context";
type IbanFieldProps = {
  label: string;
  name: "payerAccountIBAN" | "payeeAccountIBAN";
  onDynamicValidate?: (iban: string) => undefined | { message: string };
};

type ValidateResult = { valid: boolean; iban: string };

const validateIbanApi = async (iban: string) => {
  const response = await fetch(
    `https://matavi.eu/validate/?iban=${encodeURIComponent(iban)}`
  );
  if (!response.ok) {
    throw new Error("Failed to validate IBAN");
  }
  const result = await response.json();

  return result;
};

export const IbanField = withForm({
  ...defaultValues,
  props: {
    label: "",
    name: "payerAccountIBAN",
    onDynamicValidate: undefined,
  } as IbanFieldProps,
  render: function Render({ form, name, label, onDynamicValidate }) {
    const queryClient = useQueryClient();
    const { setCurrentAccount, accounts } = useAccount();

    return (
      <div className="w-full">
        <form.AppField
          name={name}
          listeners={{
            onBlur: ({ value, fieldApi }) => {
              if (name !== "payerAccountIBAN") return;

              const isValid = fieldApi.getMeta().isValid;

              if (isValid) {
                const currencAccount = accounts.find((a) => a.iban === value);
                setCurrentAccount(currencAccount || null);
              }
            },
          }}
          validators={{
            onDynamic: ({ value }) => {
              const parseRes = ibanValidation.safeParse(value);

              if (parseRes.success === false) {
                return {
                  message: parseRes.error.issues[0].message,
                };
              }

              const err = onDynamicValidate
                ? onDynamicValidate(value)
                : undefined;

              return err;
            },
            onBlurAsyncDebounceMs: 300,
            onBlurAsync: async ({ value }) => {
              const iban = (value || "").trim();
              const parseRes = ibanValidation.safeParse(iban);

              if (parseRes.success === false) {
                return {
                  message: parseRes.error.issues[0].message,
                };
              }

              const data = await queryClient.ensureQueryData<ValidateResult>({
                queryKey: ["validate-iban", iban],
                queryFn: () => validateIbanApi(iban),
                staleTime: 1000 * 60 * 60 * 24, // 24h: reuse cached result
                gcTime: 1000 * 60 * 60 * 24 * 7, // 7d
              });

              return data.valid
                ? undefined
                : {
                    message: "IBAN is invalid according to external validation",
                  };
            },
          }}
          children={(field) => (
            <field.TextField label={label} className="w-full" />
          )}
        />
      </div>
    );
  },
});
