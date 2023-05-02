import {Failure, Result, Success} from "../../lib/services/http/http.types";

type HttpMethod = "get" | "post" | "put" | "delete"

export const httpMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}

export const mockHttpResponse = (method: HttpMethod, resultMock: Failure | Success<any>) => {
  return httpMock[method].mockResolvedValueOnce(resultMock)
}