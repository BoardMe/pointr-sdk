import { Pointr } from "../../lib/pointr";
import { draftMock } from "../mocks/draft.mock";
import { httpMock, mockHttpResponse } from "../mocks/http.mock";

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const createDraftUrl = pointr.createDraftUrl.bind(pointr)

  return { createDraftUrl }
}

describe('createDraftUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return an error if request fails', async () => {
    const { createDraftUrl } = setupSUT();

    const mockedErrorMessage = 'Failed to create draft'

    mockHttpResponse('post', {
      error: {
        status: 500,
        message: mockedErrorMessage
      }
    })

    try {
      await createDraftUrl('test');
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toBe(mockedErrorMessage);
    }
  })
  it('should create and return a draft-url object', async () => {
    const { createDraftUrl } = setupSUT();

    const mockedDraft = draftMock()

    const mockedData = {
      url: 'https://example.com',
      draftId: mockedDraft.id
    }

    mockHttpResponse('post', {
      data: mockedData,
      error: null
    })

    const draft = await createDraftUrl(mockedDraft.userKey);

    expect(draft).toBe(mockedData);
    expect(httpMock.post).toBeCalledWith('/v1/draft/url', { userKey: mockedDraft.userKey });
  });
})