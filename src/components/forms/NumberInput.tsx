import { FieldShell } from "@/components/forms/FieldShell";
import { inputClassName } from "@/components/forms/inputStyles";

interface NumberInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  hideLabel?: boolean;
}

export function NumberInput({
  label,
  value,
  onChange,
  hint,
  min,
  max,
  step = 0.01,
  hideLabel,
}: NumberInputProps) {
  return (
    <FieldShell label={label} hint={hint} hideLabel={hideLabel}>
      <input
        className={inputClassName}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value ?? 0}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </FieldShell>
  );
}
