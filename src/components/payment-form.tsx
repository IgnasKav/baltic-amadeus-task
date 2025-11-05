import { defaultValues, useAppForm } from "@/forms/form-config";
import { revalidateLogic, useStore } from "@tanstack/react-form";
import { paymentFormSchema } from "@/components/schemas/payment-form-schema";
import { IbanField } from "./inputs/iban-input";

const payerAccounts = [
  {
    iban: "LT307300010172619160",
    id: "1",
    balance: 1000.12,
  },
  {
    iban: "LT307300010172619161",
    id: "2",
    balance: 2.43,
  },

  {
    iban: "LT307300010172619162",
    id: "3",
    balance: -5.87,
  },
];

export const PaymentForm = () => {
  const form = useAppForm({
    ...defaultValues,
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "change",
    }),
    validators: {
      onSubmit: paymentFormSchema,
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  const payerAccountIBAN = useStore(
    form.store,
    (state) => state.values.payerAccountIBAN
  );
  const payerAccountIBANMeta = useStore(
    form.store,
    (state) => state.fieldMeta.payerAccountIBAN
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-8 w-[400px]"
    >
      <h1>Payment Form</h1>

      <form.AppField
        name="paymentAmount"
        validators={{
          onDynamic: paymentFormSchema.shape.paymentAmount,
        }}
        children={(field) => (
          <field.NumberField
            label="Payment Amount"
            disabled={!payerAccountIBAN || !payerAccountIBANMeta.isValid}
          />
        )}
      />
      <IbanField
        form={form}
        name="payeeAccountIBAN"
        label="Payee Account IBAN"
        onDynamicValidate={(value: string) => {
          const payerAccountIban = form.getFieldValue("payerAccountIBAN");

          if (payerAccountIban.trim() === "") return undefined;

          if (payerAccountIban === value) {
            return {
              message: "Payer and Payee IBANs cannot be the same.",
            };
          }

          return undefined;
        }}
      />
      <IbanField
        form={form}
        name="payerAccountIBAN"
        label="Payer Account IBAN"
        onDynamicValidate={(value: string) => {
          const payerExists = payerAccounts.find((acc) => acc.iban === value);

          if (!payerExists) {
            return {
              message: "Payer account IBAN not found.",
            };
          }

          return undefined;
        }}
      />
      <form.AppField
        name="payee"
        validators={{
          onDynamic: paymentFormSchema.shape.payee,
        }}
        children={(field) => <field.TextField label="Payee" />}
      />
      <form.AppField
        name="purpose"
        validators={{
          onDynamic: paymentFormSchema.shape.purpose,
        }}
        children={(field) => <field.TextField label="Purpose" />}
      />
      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
};
