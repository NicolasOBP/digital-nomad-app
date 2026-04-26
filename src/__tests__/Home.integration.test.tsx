import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";

import { renderApp } from "../test-utils/renderApp";

describe("integration: Home", () => {
  it("should display the city list and navigate to details when the city card is pressed", async () => {
    renderApp({ isAuthenticated: true });

    fireEvent.press(await screen.findByText("Rio de Janeiro"));

    expect(await screen.findByText("Pontos Turísticos")).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId("Chevron-left"));

    expect(await screen.findByText("Bangkok")).toBeOnTheScreen();

    fireEvent.changeText(screen.getByTestId("search-input"), "Barcel");

    await waitForElementToBeRemoved(() => screen.getByText("Bangkok"));

    expect(screen.getByText("Barcelona")).toBeOnTheScreen();
    expect(screen.getByText("Espanha")).toBeOnTheScreen();
  });
});
