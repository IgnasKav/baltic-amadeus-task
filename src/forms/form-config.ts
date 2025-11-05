import { SubscribeButton } from "@/components/inputs/form-subscribe-button";
import { NumberField } from "@/components/inputs/number-field";
import { TextField } from "@/components/inputs/text-field";
import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form";

export const defaultValues = formOptions({
    defaultValues: {
        paymentAmount: 0,
        payerAccountIBAN: "",
        payeeAccountIBAN: "",
        payee: "",
        purpose: "",
    }
});

export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
        TextField,
        NumberField,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
});


