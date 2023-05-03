import {Draft} from "../../pointr.types";

export const draftMock = (params?: Partial<Draft>) =>
  ({
    id: params?.id ?? '08a3eb1c-8630-4661-8875-b8439d2e2583',
    createdAt: params?.createdAt ?? new Date(),
    ownerId: params?.ownerId ?? '08a3eb1c-8630-4661-8875-b8439d2e2583',
    redirectUrl: params?.redirectUrl ?? 'https://putspox.com',
    answersRequired: params?.answersRequired ?? 10,
    updatedAt: params?.updatedAt ?? new Date(),
    userId: params?.userId ?? '08a3eb1c-8630-4661-8875-b8439d2e2583',
    userKey: params?.userKey ?? 'user-key'
  } as Draft)
