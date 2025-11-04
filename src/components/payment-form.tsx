import { useAppForm } from "@/forms/form-config";
import { revalidateLogic } from "@tanstack/react-form";
import z from "zod";

const ibanValidation = z
  .string()
  // Will reduce request count to endpoint
  .min(15, "IBAN must be at least 15 characters long")
  .max(34, "IBAN cannot exceed 34 characters");

const paymentFormSchema = z.object({
  paymentAmount: z.number().min(0.01, "Payment amount must be at least 0.01"),
  payerAccountIBAN: ibanValidation,
  payeeAccountIBAN: ibanValidation,
  payee: z
    .string()
    .min(3, "Payee is required")
    .max(70, "Payee cannot exceed 70 characters"),
  purpose: z
    .string()
    .min(3, "Purpose is required")
    .max(135, "Purpose cannot exceed 135 characters"),
});

export const PaymentForm = () => {
  const form = useAppForm({
    defaultValues: {
      paymentAmount: 0,
      payerAccountIBAN: "",
      payeeAccountIBAN: "",
      payee: "",
      purpose: "",
    },
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "change",
    }),
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
      className="flex flex-col gap-6 w-[400px]"
    >
      <h1>Payment Form</h1>

      <form.AppField
        name="paymentAmount"
        validators={{
          onDynamic: paymentFormSchema.shape.paymentAmount,
        }}
        children={(field) => <field.NumberField label="Payment Amount" />}
      />
      <form.AppField
        name="payerAccountIBAN"
        validators={{
          onDynamic: paymentFormSchema.shape.payerAccountIBAN,
        }}
        children={(field) => <field.TextField label="Payer Account IBAN" />}
      />
      <form.AppField
        name="payeeAccountIBAN"
        validators={{
          onDynamic: paymentFormSchema.shape.payeeAccountIBAN,
        }}
        children={(field) => <field.TextField label="Payee Account IBAN" />}
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
