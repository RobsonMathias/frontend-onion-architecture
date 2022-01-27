import { Service } from 'services/service';
import axios, { AxiosInstance } from 'axios';

export class ApiAdapter extends Service {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    super();
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  delete<R>(path: string): Promise<R> {
    return this.instance.delete(path);
  }

  get<T>(path: string): Promise<T> {
    return this.instance.get(path);
  }

  patch<T>(path: string, data: T): Promise<T> {
    return this.instance.patch(path, data);
  }

  post<T>(path: string, data: T): Promise<T> {
    return this.instance.post(path, data);
  }

  put<T>(path: string, data: T): Promise<T> {
    return this.instance.put(path, data);
  }

  removeInterceptorHeaders(id: number): void {
    return this.instance.interceptors.request.eject(id);
  }

  setInterceptorHeaders(headers: { [p: string]: string }): number {
    return this.instance.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        ...headers
      };
      return config;
    });
  }
}
