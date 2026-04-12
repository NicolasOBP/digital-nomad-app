import { Href, router } from "expo-router";
import { Pressable } from "react-native";

import { Text } from "../components/Text";

type TextLinkProps = {
  text: string;
  ctaText: string;
  href?: Href;
  goBackOnPress?: boolean;
};

export function TextLink({
  ctaText,
  href,
  text,
  goBackOnPress,
}: TextLinkProps) {
  function handleOnPress() {
    if (href) {
      router.navigate(href);
    } else if (goBackOnPress) {
      router.back();
    }
  }
  return (
    <Pressable onPress={handleOnPress}>
      <Text alignSelf="center" mt="s16" color="gray2">
        {text}{" "}
        <Text color="primary" variant="title14">
          {ctaText}
        </Text>
      </Text>
    </Pressable>
  );
}
