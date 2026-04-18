import RNToast, { ToastConfig } from "react-native-toast-message";

import { Box } from "@/src/ui/components/Box";
import { Text } from "@/src/ui/components/Text";
import { ThemeColor } from "@/src/ui/theme/theme";

import { Feedback, FeedbackType } from "../../IFeedbackService";

const toastColors: Record<
  FeedbackType,
  { backgroundColor: ThemeColor; textColor: ThemeColor }
> = {
  error: { backgroundColor: "fbErrorBg", textColor: "fbErrorSurface" },
  success: { backgroundColor: "fbSuccessBg", textColor: "fbSuccessSurface" },
  warning: { backgroundColor: "fbWarningBg", textColor: "fbWarningSurface" },
  info: { backgroundColor: "fbInfoBg", textColor: "fbInfoSurface" },
};

function CustomToast({ message, type, description }: Feedback) {
  const { backgroundColor, textColor } = toastColors[type ?? "success"];
  return (
    <Box
      paddingHorizontal="s24"
      paddingVertical="s12"
      borderRadius="default"
      backgroundColor={backgroundColor}
    >
      <Text variant="title16" color={textColor} textAlign="center">
        {message}
      </Text>
      {description && (
        <Text mt="s4" color={textColor} textAlign="center">
          {description}
        </Text>
      )}
    </Box>
  );
}

const toastConfig: ToastConfig = {
  success: ({ props }) => <CustomToast {...props} />,
  error: ({ props }) => <CustomToast {...props} />,
  warning: ({ props }) => <CustomToast {...props} />,
  info: ({ props }) => <CustomToast {...props} />,
};

export function Toast() {
  return <RNToast autoHide config={toastConfig} visibilityTime={3000} />;
}
