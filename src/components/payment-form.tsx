import { defaultValues, useAppForm } from "@/forms/form-config";
import { revalidateLogic } from "@tanstack/react-form";
import { paymentFormSchema } from "@/components/schemas/payment-form-schema";
import { IbanField } from "./inputs/iban-input";

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
        children={(field) => <field.NumberField label="Payment Amount" />}
      />
      <IbanField
        form={form}
        name="payeeAccountIBAN"
        label="Payee Account IBAN"
      />
      <IbanField
        form={form}
        name="payerAccountIBAN"
        label="Payer Account IBAN"
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
