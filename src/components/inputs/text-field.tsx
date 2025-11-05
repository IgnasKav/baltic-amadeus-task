import { useFieldContext } from "@/forms/form-config";
import { TextField as MuiTextField } from "@mui/material";

type TextFieldProps = {
  label: string;
  className?: string;
};

export function TextField({ label, className }: TextFieldProps) {
  const { state, handleChange, handleBlur } = useFieldContext<string>();

  const combinedError = state.meta.errors.map((e) => e.message).join(", ");

  return (
    <MuiTextField
      label={label}
      className={className}
      variant="outlined"
      value={state.value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      error={!state.meta.isValid}
      helperText={state.meta.isValid ? "" : combinedError}
    />
  );
}
