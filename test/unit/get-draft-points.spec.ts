import { Pointr } from "../../lib/pointr";
import { draftMock } from "../mocks/draft.mock";
import { httpMock, mockHttpResponse } from "../mocks/http.mock";
import {pointsMock} from "../mocks/point.mock";

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const getDraftPoints = pointr.getDraftPoints.bind(pointr)

  return { getDraftPoints }
}

describe('getDraftPoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return an error if request fails', async () => {
    const { getDraftPoints } = setupSUT();

    mockHttpResponse('get', {
      error: {
        status: 500,
        message: 'Failed to fetch draft'
      }
    })

    try {
      await getDraftPoints('test');
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toBe('Failed to fetch draft');
    }
  })
  it('should return a list of draft points', async () => {
    const { getDraftPoints } = setupSUT();

    const mockedDraft = draftMock();
    const mockedPoints = [pointsMock(), pointsMock()];

    mockHttpResponse('get', {
      data: mockedPoints,
      error: null
    })

    const points = await getDraftPoints(mockedDraft.userKey);

    expect(points).toBe(mockedPoints);
    expect(httpMock.get).toBeCalledWith(`/v1/draft/${mockedDraft.userKey}/points`);
  });
})