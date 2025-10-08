import { cn } from "@/utils/cn";
import { TextInput, TouchableOpacity } from "react-native";

type InputProps = {
  className?: string | undefined;
  inputClassName?: string | undefined;
  placeholder: string;
  onChangeText: (value: string) => void;
  text: string;
};
export default function Input({
  className,
  onChangeText,
  text,
  placeholder,
  inputClassName,
}: InputProps) {
  return (
    <TouchableOpacity
      className={cn(
        "border-[#EDF1F3] h-[48px] border-[0.5px]   justify-center  rounded-xl pl-4 ",
        className
      )}
    >
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        className={cn("text-xl text-white h-[48px]", inputClassName)}
      />
    </TouchableOpacity>
  );
}
