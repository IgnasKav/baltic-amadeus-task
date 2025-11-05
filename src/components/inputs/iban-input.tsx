import { defaultValues, withForm } from "@/forms/form-config";
import { useQueryClient } from "@tanstack/react-query";
import { ibanValidation } from "../schemas/payment-form-schema";

type IbanFieldProps = {
  label: string;
  name: "payerAccountIBAN" | "payeeAccountIBAN";
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
  } as IbanFieldProps,
  render: function Render({ form, name, label }) {
    const queryClient = useQueryClient();

    return (
      <div className="w-full">
        <form.AppField
          name={name}
          validators={{
            onDynamic: ibanValidation,
            onBlurAsyncDebounceMs: 500,
            onBlurAsync: async ({ value }) => {
              const iban = (value || "").trim();
              ibanValidation.parse(iban);

              const data = await queryClient.ensureQueryData<ValidateResult>({
                queryKey: ["validate-iban", iban],
                queryFn: () => validateIbanApi(iban),
                staleTime: 1000 * 60 * 60 * 24, // 24h: reuse cached result
                gcTime: 1000 * 60 * 60 * 24 * 7, // 7d
              });

              console.log("data", data);
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
