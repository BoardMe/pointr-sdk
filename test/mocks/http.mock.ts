import {AxiosResponse} from "axios";

type HttpMethod = "get" | "post" | "put" | "delete"

export const httpMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}

export const mockHttpResponse = (method: HttpMethod,resultMock: Partial<AxiosResponse>) => {
  return httpMock[method].mockResolvedValueOnce(resultMock)
}