import { useFieldContext } from "@/forms/form-config";
import { TextField as MuiTextField } from "@mui/material";

export function TextField({ label }: { label: string }) {
  const { state, handleChange, handleBlur } = useFieldContext<string>();

  const combinedError = state.meta.errors.map((e) => e.message).join(", ");

  return (
    <MuiTextField
      label={label}
      variant="outlined"
      value={state.value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      error={!state.meta.isValid}
      helperText={state.meta.isValid ? "" : combinedError}
    />
  );
}
