import { SubscribeButton } from "@/components/inputs/form-subscribe-button";
import { NumberField } from "@/components/inputs/number-field";
import { TextField } from "@/components/inputs/text-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm } = createFormHook({
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
