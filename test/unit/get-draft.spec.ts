import { Pointr } from "../../lib/pointr";
import { draftMock } from "../mocks/draft.mock";
import { httpMock, mockHttpResponse } from "../mocks/http.mock";

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const getDraft = pointr.getDraft.bind(pointr)

  return { getDraft }
}

describe('getDraft', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return an error if request fails', async () => {
    const { getDraft } = setupSUT();

    mockHttpResponse('get', {
      error: {
        status: 500,
        message: 'Failed to fetch draft'
      }
    })

    try {
      await getDraft('test');
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toBe('Failed to fetch draft');
    }
  })
  it('should return a draft', async () => {
    const { getDraft } = setupSUT();

    const mockedDraft = draftMock();

    mockHttpResponse('get', {
      data: mockedDraft,
      error: null
    })

    const draft = await getDraft('test');

    expect(draft).toBe(mockedDraft);
    expect(httpMock.get).toBeCalledWith('/v1/draft/test');
  });
})