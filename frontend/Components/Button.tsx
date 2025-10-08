import Text from "@/Components/Text";
import { cn } from "@/utils/cn";
import { TouchableOpacity } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  className?: string | undefined;
  onPress?: () => void;
};
export default function Button({ children, className, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "bg-primary h-[48px] justify-center items-center  rounded-xl ",
        className
      )}
    >
      <Text className="text-xl font-bold text-white">{children}</Text>
    </TouchableOpacity>
  );
}
