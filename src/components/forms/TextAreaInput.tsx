import { FieldShell } from "@/components/forms/FieldShell";
import { inputClassName } from "@/components/forms/inputStyles";

interface TextAreaInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}

export function TextAreaInput({
  label,
  value,
  onChange,
  hint,
  rows = 4,
}: TextAreaInputProps) {
  return (
    <FieldShell label={label} hint={hint}>
      <textarea
        className={`${inputClassName} resize-none`}
        rows={rows}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}
