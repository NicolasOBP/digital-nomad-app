import { screen } from "@testing-library/react-native";

import { renderComponent } from "@/src/test-utils/renderComponent";

import { Text } from "../Text";

describe("<Text />", () => {
  test("render component", () => {
    renderComponent(<Text>Hello World</Text>);

    expect(screen.getByText(/hello world/i)).toBeOnTheScreen();
  });
});
