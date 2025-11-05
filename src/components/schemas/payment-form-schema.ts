import z from "zod";
import { PaymentForm } from '../payment-form';

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

type PaymentForm = z.infer<typeof paymentFormSchema>;

export { paymentFormSchema, ibanValidation, PaymentForm };