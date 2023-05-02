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
  it('should return a draft', async () => {
    const { getDraft } = setupSUT();

    mockHttpResponse('get', {
      data: mockedDraft
    })

    const draft = await getDraft('test');

    expect(draft).toBe(mockedDraft);
  });
})