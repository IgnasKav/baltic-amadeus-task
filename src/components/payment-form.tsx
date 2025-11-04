import { useAppForm } from "@/forms/form-config";
import { revalidateLogic } from "@tanstack/react-form";
import z from "zod";

const paymentFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  age: z.number().min(13, "Age must be at least 13"),
});

export const PaymentForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: "",
      age: 0,
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
      <h1>Personal Information</h1>
      {/* Components are bound to `form` and `field` to ensure extreme type safety */}
      {/* Use `form.AppField` to render a component bound to a single field */}
      <form.AppField
        name="username"
        validators={{
          onDynamic: paymentFormSchema.shape.username,
        }}
        children={(field) => <field.TextField label="Full Name" />}
      />
      {/* The "name" property will throw a TypeScript error if typo'd  */}
      <form.AppField
        name="age"
        validators={{
          onDynamic: paymentFormSchema.shape.age,
        }}
        children={(field) => <field.NumberField label="Age" />}
      />
      {/* Components in `form.AppForm` have access to the form context */}
      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
};
