import { useFieldContext } from "@/lib/form-config";
import { InputAdornment, TextField as MuiTextField } from "@mui/material";
import { Spinner } from "../shared/spinner";

type TextFieldProps = {
  label: string;
  className?: string;
};

export function TextField({ label, className }: TextFieldProps) {
  const { state, handleChange, handleBlur } = useFieldContext<string>();

  const combinedError = state.meta.errors.map((e) => e.message).join(", ");
  const isValidating = state.meta.isValidating;

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
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {isValidating ? <Spinner /> : null}
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
