import { useFieldContext } from "@/forms/form-config";
import { TextField as MuiTextField } from "@mui/material";

export function TextField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const { state, handleChange, handleBlur } = useFieldContext<string>();
  return (
    <MuiTextField
      label={label}
      variant="outlined"
      value={state.value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
    />
  );
}
