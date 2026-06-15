import { NumberInput } from "@/components/forms/NumberInput";

interface MoneyInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  hint?: string;
  step?: number;
  hideLabel?: boolean;
}

export function MoneyInput(props: MoneyInputProps) {
  return (
    <NumberInput
      {...props}
      min={0}
      step={props.step ?? 1000}
      hint={props.hint ?? "Rupiah"}
    />
  );
}
