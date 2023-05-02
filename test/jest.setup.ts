import { httpMock } from "./mocks/http.mock";

jest.mock("../lib/services/http/http.service", () => ({
  Http: jest.fn().mockImplementation(() => httpMock)
}))
