import { Point } from "../../lib/pointr.types";

export const pointMock = (params?: Partial<Point>) =>
  ({
    question: params?.question ?? "test-question",
    answer: params?.answer ?? "test-answer",
    createdAt: params?.createdAt ?? "2021-01-01T00:00:00.000Z",
  } as Point)
