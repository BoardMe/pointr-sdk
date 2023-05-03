export interface PointrClient {
  /**
   * Get a draft by user key
   * @param userKey The key that identifies the user for your application
   */
  getDraft(userKey: string): Promise<Draft>
  /**
   * Get a draft by user key
   * @param params An object of parameters to create a draft
   */
  createDraft(params: CreateDraftParams): Promise<Draft>
  /**
   * Create a draftUrl based on the userKey
   * @param userKey The key that identifies the user for your application
   */
  createDraftUrl(userKey: string): Promise<CreateDraftUrlResponse>
  /**
   * Get a list of drafts based on the userKey
   * @param userKey The key that identifies the user for your application
   */
  getDraftPoints(userKey: string): Promise<Point[]>
  /**
   * Returns true if the user exists based on the userEmail
   * @param userEmail The email of the user to check
   */
  checkIfUserExists(userEmail: string): Promise<CheckIfUserExistsResponse>
  /**
   * Get existing points for a user based on the userEmail
   * @param userEmail The key that identifies the user for your application
   */
  getExistingPoints(userEmail: string): Promise<Point[]>
}

/**
 * A collection of information about a draft
 */
export type Draft = {
  /**
   * The unique identifier for this draft
   */
  id: string
  /**
   * The email of the user that for this draft
   */
  userId: string
  /**
   * The key that identifies the user for your application
   */
  userKey: string
  /**
   * The number of answers required to complete this draft
   */
  answersRequired: number
  /**
   * The URL to redirect the user to after they have completed the draft
   */
  redirectUrl: string
  /**
   * The unique identifier for the owner of this draft
   */
  ownerId: string
  /**
   * The date and time this draft was created
   */
  createdAt: string
  /**
   * The date and time this draft was last updated
   */
  updatedAt: string
}

/**
 * A collection that represents an answer to a question
 */
export type Point = {
  /**
   * The question that was answered
   */
  question: string
  /**
   * The answer to the question
   */
  answer: string
  /**
   * The date and time this point was created
   */
  createdAt: string
}

/**
 * The required params to create a draft
 */
export type CreateDraftParams = {
  /**
   * The email of the user that for this draft
   */
  userEmail: string
  /**
   * The key that identifies the user for your application
   */
  userKey: string
  /**
   * The URL to redirect the user to after they have completed the draft
   */
  redirectUrl: string
  /**
   * The number of answers required to complete this draft. It must be a value between 5 and 20
   */
  answersRequired?: number
}

/**
 * A collection of information about a draft url
 */
export type CreateDraftUrlResponse = {
  /**
   * A magic-link for the user to run the draft
   */
  url: string
  /**
   * The unique identifier for this draft
   */
  draftId: string
}

/**
 * An object that informs if the user exists
 */
export type CheckIfUserExistsResponse = {
  exists: boolean
}