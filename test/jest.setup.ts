import { httpMock } from "./mocks/http.mock";

jest.mock("../services/http/http.service", () => ({
  Http: jest.fn().mockImplementation(() => httpMock)
}))
