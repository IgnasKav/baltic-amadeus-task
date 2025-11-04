import { useFieldContext } from "@/forms/form-config";

export function NumberField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<number>();

  return (
    <label>
      <span>{label}</span>
      <input
        value={field.state.value}
        type="number"
        onChange={(e) => field.handleChange(+e.target.value)}
      />
    </label>
  );
}
