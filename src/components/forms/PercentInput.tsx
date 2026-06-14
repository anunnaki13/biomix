import { NumberInput } from "@/components/forms/NumberInput";

interface PercentInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  hint?: string;
  step?: number;
}

export function PercentInput(props: PercentInputProps) {
  return (
    <NumberInput
      {...props}
      min={0}
      max={100}
      step={props.step ?? 0.1}
      hint={props.hint ?? "Persen"}
    />
  );
}
