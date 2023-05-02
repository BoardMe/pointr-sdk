import { Http } from "../services/http/http.service";
import { Draft } from "./pointr.types";

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
}