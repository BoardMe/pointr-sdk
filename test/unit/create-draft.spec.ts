import { Pointr } from "../../lib/pointr";
import { draftMock } from "../mocks/draft.mock";
import { httpMock, mockHttpResponse } from "../mocks/http.mock";

const setupSUT = () => {
  const pointr = new Pointr("sample-api-key");
  const createDraft = pointr.createDraft.bind(pointr)

  return { createDraft }
}

describe('createDraft', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return an error if request fails', async () => {
    const { createDraft } = setupSUT();

    const mockedParams = {
      userKey: 'test',
      redirectUrl: 'https://example.com',
      answersRequired: 1,
      userEmail: 'test@test.com'
    }

    const mockedErrorMessage = 'Failed to create draft'

    mockHttpResponse('post', {
      error: {
        status: 500,
        message: mockedErrorMessage
      }
    })

    try {
      await createDraft(mockedParams);
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toBe(mockedErrorMessage);
    }
  })
  it('should return a draft', async () => {
    const { createDraft } = setupSUT();

    const mockedParams = {
      userKey: 'test',
      redirectUrl: 'https://example.com',
      answersRequired: 1,
      userEmail: 'test@test.com'
    }

    const mockedDraft = draftMock(mockedParams)

    mockHttpResponse('post', {
      data: mockedDraft,
      error: null
    })

    const draft = await createDraft(mockedParams);

    expect(draft).toBe(mockedDraft);
    expect(httpMock.post).toBeCalledWith('/v1/draft', mockedParams);
  });
})