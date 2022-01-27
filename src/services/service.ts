export abstract class Service {
  abstract get<R>(path: string): Promise<R>;
  abstract put<P, R>(path: string, data?: P): Promise<R>;
  abstract put<P>(path: string, data?: P): Promise<P>;
  abstract post<P, R>(path: string, data?: P): Promise<R>;
  abstract post<P>(path: string, data?: P): Promise<P>;
  abstract delete(path: string): Promise<undefined>;
  abstract patch<P, R>(path: string, data?: P): Promise<R>;
  abstract patch<P>(path: string, data?: P): Promise<P>;
  abstract setInterceptorHeaders(headers: { [key: string]: string }): number;
  abstract removeInterceptorHeaders(id: number): void;
}
