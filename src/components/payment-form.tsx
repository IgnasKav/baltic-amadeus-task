import { defaultValues, useAppForm } from "@/lib/form-config";
import { revalidateLogic, useStore } from "@tanstack/react-form";
import { paymentFormSchema } from "@/components/schemas/payment-form-schema";
import { IbanField } from "./inputs/iban-input";
import { useAccount } from "@/contexts/account-context";
import { LanguageField } from "./inputs/language-field";

export const PaymentForm = () => {
  const { processPayment, accounts, translations } = useAccount();
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
      processPayment(value);
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
      <LanguageField />
      <h1>{translations.paymentFormTitle}</h1>
      <IbanField
        form={form}
        name="payerAccountIBAN"
        label={translations.payerAccountIbanField.label}
        onDynamicValidate={(value: string) => {
          const payerExists = accounts.find((acc) => acc.iban === value);

          if (!payerExists) {
            return {
              message: translations.payerAccountIbanField.notFound,
            };
          }

          return undefined;
        }}
      />
      <form.AppField
        name="paymentAmount"
        validators={{
          onBlurListenTo: ["payerAccountIBAN"],
          onBlur: ({ value, fieldApi }) => {
            const isTouched = fieldApi.getMeta().isTouched;

            if (!isTouched) return undefined;

            const parseRes =
              paymentFormSchema.shape.paymentAmount.safeParse(value);

            if (parseRes.success === false) {
              const errorKey = parseRes.error.issues[0].message;
              // @ts-expect-error errorKey is set in schema
              const translatedError = translations.paymentField[errorKey];

              return {
                message: translatedError,
              };
            }

            const payerAccount = accounts.find(
              (acc) => acc.iban === payerAccountIBAN
            );

            if (payerAccount && value > payerAccount.balance) {
              return {
                message: translations.paymentField.insufficientPayerBalance,
              };
            }

            return undefined;
          },
        }}
        children={(field) => (
          <field.NumberField
            label={translations.paymentField.label}
            disabled={!payerAccountIBAN || !payerAccountIBANMeta.isValid}
          />
        )}
      />
      <IbanField
        form={form}
        name="payeeAccountIBAN"
        label={translations.payeeAccountIbanField.label}
        onDynamicValidate={(value: string) => {
          if (payerAccountIBAN.trim() === "") return undefined;

          if (payerAccountIBAN === value) {
            return {
              message: translations.payeeAccountIbanField.sameAsPayer,
            };
          }

          return undefined;
        }}
      />

      <form.AppField
        name="payee"
        validators={{
          onDynamic: ({ value }) => {
            const parseRes = paymentFormSchema.shape.payee.safeParse(value);

            if (parseRes.success === false) {
              const errorKey = parseRes.error.issues[0].message;
              // @ts-expect-error errorKey is set in schema
              const translatedError = translations.payeeField[errorKey];

              return {
                message: translatedError,
              };
            }
          },
        }}
        children={(field) => (
          <field.TextField label={translations.payeeField.label} />
        )}
      />
      <form.AppField
        name="purpose"
        validators={{
          onDynamic: ({ value }) => {
            const parseRes = paymentFormSchema.shape.purpose.safeParse(value);

            if (parseRes.success === false) {
              const errorKey = parseRes.error.issues[0].message;
              // @ts-expect-error errorKey is set in schema
              const translatedError = translations.purposeField[errorKey];

              return {
                message: translatedError,
              };
            }
          },
        }}
        children={(field) => (
          <field.TextField label={translations.purposeField.label} />
        )}
      />
      <form.AppForm>
        <form.SubscribeButton label={translations.submit} />
      </form.AppForm>
    </form>
  );
};
