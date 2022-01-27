export interface Storage {
  save: <P>(path: string, payload: P) => Promise<P>;
  get: <P>(key: string) => Promise<P>;
  remove: (key: string) => void;
}
