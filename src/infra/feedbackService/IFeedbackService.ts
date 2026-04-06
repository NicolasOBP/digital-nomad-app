export type FeedbackType = "error" | "success";

type Feedback = {
  type: FeedbackType;
  message: string;
  description?: string;
};

export interface IFeedbackService {
  send: (feedback: Feedback) => void;
}
