import { Pressable, StyleSheet, View } from "react-native";

import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import theme from "../theme/theme";
import { useAppTheme } from "../theme/useAppTheme";

import { Box } from "./Box";
import { Text } from "./Text";

type AccordionProps = {
  title: string;
  description: string;
};

export function Accordion({ description, title }: AccordionProps) {
  const isOpen = useSharedValue(false);
  const progress = useSharedValue(0); // 0 => 1

  function handleOpenPress() {
    isOpen.value = !isOpen.value;
    progress.value = withTiming(isOpen.value ? 0 : 1, { duration: 1200 });
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader title={title} progress={progress} />
        <AccordionBody description={description} isOpen={isOpen} />
      </View>
    </Pressable>
  );
}

function AccordionHeader({
  title,
  progress,
}: {
  title: string;
  progress: SharedValue<number>;
}) {
  // progress = 0 => 1
  // icon = 0 => -180
  const { colors } = useAppTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg" },
    ],
    tintColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray2, colors.primary],
    ),
  }));

  return (
    <View style={styles.header}>
      <Box flexShrink={1}>
        <Text variant="title16">{title}</Text>
      </Box>

      <Animated.Image
        style={[animatedStyle, { width: 24, height: 24 }]}
        source={require("@/assets/images/chevron-down.png")}
      />
    </View>
  );
}

function AccordionBody({
  description,
  isOpen,
}: {
  description: string;
  isOpen: SharedValue<boolean>;
}) {
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value * Number(isOpen.value), {
        duration: 1000,
        easing: isOpen.value ? Easing.elastic(1.5) : Easing.exp,
      }),
    };
  });

  return (
    <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
      <View
        style={styles.body}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        <Text>{description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.s16,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: theme.borderRadii.default,
    alignItems: "center",
  },
  body: {
    position: "absolute",
    paddingHorizontal: theme.spacing.s16,
    paddingBottom: theme.spacing.s16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default,
  },
});
