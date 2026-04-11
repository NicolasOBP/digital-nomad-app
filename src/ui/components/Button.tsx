import { ThemeColor } from "../theme/theme";

import { TouchableOpacityBox, TouchableOpacityBoxProps } from "./Box";
import { Text } from "./Text";

type ButtonVariants = "primary" | "secondary";

const buttonColors: Record<
  ButtonVariants,
  { backgroundColor: ThemeColor; textColor: ThemeColor }
> = {
  primary: {
    backgroundColor: "primary",
    textColor: "text",
  },
  secondary: {
    backgroundColor: "gray1",
    textColor: "text",
  },
};

type ButtonProps = TouchableOpacityBoxProps & {
  title: string;
  onPress: () => void;
  variant?: ButtonVariants;
};

export function Button({
  onPress,
  title,
  variant = "primary",
  ...toProps
}: ButtonProps) {
  const buttonVariant = buttonColors[variant];

  return (
    <TouchableOpacityBox
      backgroundColor={buttonVariant.backgroundColor}
      borderRadius="default"
      padding="padding"
      justifyContent="center"
      alignItems="center"
      onPress={onPress}
      {...toProps}
    >
      <Text color={buttonVariant.textColor}>{title}</Text>
    </TouchableOpacityBox>
  );
}
