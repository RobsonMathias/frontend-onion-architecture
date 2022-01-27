import { Service } from 'services/service';

export class StorageAdapter extends Service {
  static dayToExpired = 2;

  constructor(private storage: Storage) {
    super();
  }

  delete(path: string): Promise<undefined> {
    this.storage.removeItem(path);
    return Promise.resolve(undefined);
  }

  get<R>(path: string): Promise<R> {
    try {
      const element = this.storage.getItem(path);
      if (element) {
        const response = JSON.parse(element) as { data: R };
        if (!StorageAdapter.hasExpired(response)) {
          return Promise.resolve(response.data);
        } else {
          this.storage.removeItem(path);
          return Promise.reject(new Error('Element has expired'));
        }
      }
      return Promise.reject(new Error('Element not found'));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  patch<P>(path: string, data: P): Promise<P> {
    return this.post(path, data);
  }

  post<P>(path: string, data: P): Promise<P> {
    this.storage.setItem(
      path,
      JSON.stringify({
        data,
        createdAt: Date.now().toString(),
        dayToExpired: StorageAdapter.dayToExpired
      })
    );
    return Promise.resolve(data);
  }

  put<P>(path: string, data: P): Promise<P> {
    return this.post(path, data);
  }

  static hasExpired(data: any): boolean {
    const { createdAt = Date.now(), dayToExpired } = data;
    return (new Date(createdAt).getTime() - Date.now()) / (1000 * 3600 * 24) > dayToExpired;
  }

  removeInterceptorHeaders(id: number) {}

  setInterceptorHeaders(headers: { [p: string]: string }) {
    return 0;
  }

  clear() {
    this.storage.clear();
  }
}
