import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BottomSheetProps = {
  onPress: () => void;
  isOpen: SharedValue<boolean>;
  duration?: number;
};

export function BottomSheet({
  onPress,
  children,
  isOpen,
  duration = 500,
}: BottomSheetProps & PropsWithChildren) {
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(Number(!isOpen.value), { duration: duration }),
  );

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    zIndex: isOpen.value ? 1 : -1,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * height.value }],
    zIndex: 2,
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress} />
      </Animated.View>

      <Animated.View
        style={[styles.sheet, sheetAnimatedStyle]}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        {children}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
