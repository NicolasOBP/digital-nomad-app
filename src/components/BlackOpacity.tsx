import { Box } from "./Box";

export function BlackOpacity() {
  return (
    <Box
      width="100%"
      height="100%"
      backgroundColor="midnightBlack"
      opacity={0.25}
      position="absolute"
    />
  );
}
