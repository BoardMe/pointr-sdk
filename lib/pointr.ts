import { Http } from "../services/http/http.service";
import {CheckIfUserExistsResponse, CreateDraftParams, CreateDraftUrlResponse, Draft, Point} from "./pointr.types";

export class Pointr {
  private http: Http;
  constructor(private readonly apiKey: string) {
    this.http = new Http(apiKey)
  }

  async getDraft(userKey: string) {
    const result = await this.http.get<Draft>(`/v1/draft/${userKey}`);

    if(result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async createDraft(params: CreateDraftParams) {
    const result = await this.http.post<Draft>(`/v1/draft`, params);

    if(result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async createDraftUrl(userKey: string) {
    const result = await this.http.post<CreateDraftUrlResponse>(`/v1/draft/url`, { userKey });

    if(result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getDraftPoints(userKey: string) {
    const result = await this.http.get<Point[]>(`/v1/draft/${userKey}/points`);

    if(result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async checkIfUserExists(userEmail: string) {
    const result = await this.http.get<CheckIfUserExistsResponse>(`/v1/user/${userEmail}/exists`);

    if(result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  }
}