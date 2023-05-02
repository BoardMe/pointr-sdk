export interface PointrClient {
  getDraft(userKey: string): Promise<Draft>
  createDraft(params: CreateDraftParams): Promise<Draft>
  createDraftUrl(userKey: string): Promise<CreateDraftUrlResponse>
  getDraftPoints(userKey: string): Promise<Point[]>
  checkIfUserExists(userEmail: string): Promise<CheckIfUserExistsResponse>
  getExistingPoints(userEmail: string): Promise<Point[]>
}

export type Draft = {
  id: string
  userId: string
  userKey: string
  answersRequired: number
  redirectUrl: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export type Point = {
  question: string
  answer: string
  createdAt: string
}

export type CreateDraftParams = {
  userEmail: string
  userKey: string
  redirectUrl: string
  answersRequired?: number
}

export type CreateDraftUrlResponse = {
  url: string
  draftId: string
}

export type CheckIfUserExistsResponse = {
  exists: boolean
}