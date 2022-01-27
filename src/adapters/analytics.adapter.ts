import { Service } from 'services/service';

export class AnalyticsAdapter extends Service {
  constructor(private service: any) {
    super();
  }

  delete(path: string): Promise<undefined> {
    return Promise.resolve(undefined);
  }

  get<T>(path: string): Promise<T> {
    return Promise.resolve(undefined as any);
  }

  patch<T>(path: string, data: T): Promise<T> {
    return this.post(path, data);
  }

  post<T>(event: string, data: T): Promise<T> {
    this.service(event, data);
    return Promise.resolve({ event, data } as any);
  }

  put<T>(path: string, data: T): Promise<T> {
    return this.post(path, data);
  }

  removeInterceptorHeaders(id: number) {}

  setInterceptorHeaders(headers: { [p: string]: string }) {
    return 0;
  }
}
