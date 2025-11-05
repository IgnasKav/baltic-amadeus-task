import { useFieldContext } from "@/forms/form-config";
import { TextField } from "@mui/material";

type NumberFieldProps = {
  label: string;
  disabled?: boolean;
};

export function NumberField({ label, disabled }: NumberFieldProps) {
  const { state, handleChange, handleBlur } = useFieldContext<number>();

  const combinedError = state.meta.errors.map((e) => e.message).join(", ");

  return (
    <TextField
      label={label}
      variant="outlined"
      type="number"
      value={state.value}
      onChange={(e) => handleChange(+e.target.value)}
      onBlur={handleBlur}
      error={!state.meta.isValid}
      helperText={state.meta.isValid ? "" : combinedError}
      disabled={disabled}
    />
  );
}
