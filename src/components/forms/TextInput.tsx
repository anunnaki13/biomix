import { FieldShell } from "@/components/forms/FieldShell";
import { inputClassName } from "@/components/forms/inputStyles";

interface TextInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  hideLabel?: boolean;
}

export function TextInput({
  label,
  value,
  onChange,
  hint,
  placeholder,
  hideLabel,
}: TextInputProps) {
  return (
    <FieldShell label={label} hint={hint} hideLabel={hideLabel}>
      <input
        className={inputClassName}
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}
