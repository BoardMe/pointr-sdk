import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Contract } from "./contract";
import {config} from "../../config";

export class Http extends Contract {
  private client: AxiosInstance

  constructor(private readonly apiKey: string) {
    super()

    this.client = axios.create({
      baseURL: config.BASE_URL + "/api",
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    })
  }

  public async get<T>(path: string, config?: AxiosRequestConfig<any> | undefined) {
    return this.try<T>(() => this.client.get(path, config))
  }

  public async post<T>(path: string, data?: any) {
    return this.try<T>(() => this.client.post(path, data))
  }

  public async put<T>(path: string, data?: any) {
    return this.try<T>(() => this.client.put(path, data))
  }

  public async delete<T>(path: string) {
    return this.try<T>(() => this.client.delete(path))
  }
}
