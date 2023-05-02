import { Pointr } from "../lib/pointr";
import { draftMock } from "./mocks/draft.mock";
import { mockHttpResponse } from "./mocks/http.mock";

const mockedDraft = draftMock();

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const getDraft = pointr.getDraft.bind(pointr)

  return { getDraft }
}

describe('getDraft', () => {
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
      expect((error as any).message).toBe('Failed to fetch draft');
    }
  })
  it('should return a draft', async () => {
    const { getDraft } = setupSUT();

    mockHttpResponse('get', {
      data: mockedDraft,
      error: null
    })

    const draft = await getDraft('test');

    expect(draft).toBe(mockedDraft);
  });
})