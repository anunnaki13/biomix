import { FieldShell } from "@/components/forms/FieldShell";
import { inputClassName } from "@/components/forms/inputStyles";

interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly { label: string; value: T }[];
  hint?: string;
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
}: SelectFieldProps<T>) {
  return (
    <FieldShell label={label} hint={hint}>
      <select
        className={inputClassName}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
