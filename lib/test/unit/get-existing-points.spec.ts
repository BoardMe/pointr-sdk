import { Pointr } from "../../index";
import { httpMock, mockHttpResponse } from "../mocks/http.mock";
import { pointMock } from "../mocks/point.mock";

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const getExistingPoints = pointr.getExistingPoints.bind(pointr)

  return { getExistingPoints }
}

describe('getExistingPoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return an error if request fails', async () => {
    const { getExistingPoints } = setupSUT();

    const userEmail = 'test@test.com';

    mockHttpResponse('get', {
      error: {
        status: 500,
        message: 'Failed to fetch'
      }
    })

    try {
      await getExistingPoints(userEmail);
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toBe('Failed to fetch');
    }
  })
  it('should return a list of points', async () => {
    const { getExistingPoints } = setupSUT();

    const userEmail = 'test@test.com';
    const mockedPoints = [pointMock(), pointMock(), pointMock()]

    mockHttpResponse('get', {
      data: mockedPoints,
      error: null
    })

    const result = await getExistingPoints(userEmail);

    expect(result).toBe(mockedPoints);
    expect(httpMock.get).toBeCalledWith(`/v1/user/${userEmail}/points`);
  });
})