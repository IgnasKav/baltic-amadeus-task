import z from "zod";
import { PaymentForm } from '../payment-form';

const ibanValidation = z
    .string()
    // Will reduce request count to endpoint
    .min(15, "minLength")
    .max(34, "maxLength");

const paymentFormSchema = z.object({
    paymentAmount: z.number().min(0.01, "min"),
    payerAccountIBAN: ibanValidation,
    payeeAccountIBAN: ibanValidation,
    payee: z
        .string()
        .min(3, "required")
        .max(70, "maxLength"),
    purpose: z
        .string()
        .min(3, "required")
        .max(135, "maxLength"),
});

type PaymentForm = z.infer<typeof paymentFormSchema>;

export { paymentFormSchema, ibanValidation, PaymentForm };