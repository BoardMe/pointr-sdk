import { Pointr } from "../../index";
import { httpMock, mockHttpResponse } from "../mocks/http.mock";

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const checkIfUserExists = pointr.checkIfUserExists.bind(pointr)

  return { checkIfUserExists }
}

describe('checkIfUserExists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return an error if request fails', async () => {
    const { checkIfUserExists } = setupSUT();

    const userEmail = 'test@test.com';

    mockHttpResponse('get', {
      error: {
        status: 500,
        message: 'Failed to fetch draft'
      }
    })

    try {
      await checkIfUserExists(userEmail);
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toBe('Failed to fetch draft');
    }
  })
  it('should check if an user exists', async () => {
    const { checkIfUserExists } = setupSUT();

    const userEmail = 'test@test.com';
    const mockedResult = {
      exists: true
    }

    mockHttpResponse('get', {
      data: mockedResult,
      error: null
    })

    const result = await checkIfUserExists(userEmail);

    expect(result).toBe(mockedResult);
    expect(httpMock.get).toBeCalledWith(`/v1/user/${userEmail}/exists`);
  });
})