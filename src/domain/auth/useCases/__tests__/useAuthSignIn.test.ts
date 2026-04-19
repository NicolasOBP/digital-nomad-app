import { act, renderHook } from "@testing-library/react-native";

import { AuthUser } from "../../AuthUser";
import { useAuthSignIn } from "../useAuthSignIn";

const mockSignIn = jest.fn();
const mockSendFeedback = jest.fn();
const mockSaveAuthUser = jest.fn();

jest.mock("@/src/infra/repositories/RepositoryProvider", () => ({
  useRepository: () => {
    return {
      auth: {
        signIn: mockSignIn,
      },
    };
  },
}));
jest.mock("@/src/infra/feedbackService/FeedbackProvider", () => ({
  useFeedbackService: () => ({
    send: mockSendFeedback,
  }),
}));

jest.mock("../../AuthContext", () => ({
  useAuth: () => ({
    saveAuthUser: mockSaveAuthUser,
  }),
}));

describe("useAuthSignIn()", () => {
  it("calls saveAuthUser and sends success feedback on successful sign in", async () => {
    const user: AuthUser = {
      id: "1",
      email: "esse@gmail.com",
      fullname: "Esse",
    };
    mockSignIn.mockResolvedValueOnce(user);

    const { result } = renderHook(() => useAuthSignIn());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.mutate({
        email: "esse@gmail.com",
        password: "pass",
      });
    });

    expect(mockSignIn).toHaveBeenCalledWith("esse@gmail.com", "pass");
    expect(mockSaveAuthUser).toHaveBeenCalledWith(user);
    expect(mockSendFeedback).toHaveBeenCalledWith({
      type: "success",
      message: `signed in as ${user.email}`,
    });
  });
});
