import { Service } from 'services/service';
import PouchDB from 'pouchdb';

export class IndexDbAdapter extends Service {
  private instance: any;

  constructor(dbname: string) {
    super();
    this.instance = new PouchDB(dbname);
  }

  async delete<R>(path: string): Promise<R> {
    try {
      const doc = await this.instance.get(path);
      return this.instance.remove(doc);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  get<T>(path: string): Promise<T> {
    return this.instance
      .allDocs({
        include_docs: true,
        startkey: path
      })
      .then((doc: { rows: any[] }) => ({
        data: doc.rows.map((r) => ({
          id: r.doc._id,
          ...r.doc
        }))
      }));
  }

  patch<T>(path: string, data: T): Promise<T> {
    return this.put(path, data);
  }

  post<T>(path: string, data: T): Promise<T> {
    return this.put(path, data);
  }

  put<T>(path: string, data: T): Promise<T> {
    const id = (Math.random() + 1).toString(36).substring(6);
    return this.instance.put({
      _id: `${path}/${id}`,
      ...data
    });
  }

  removeInterceptorHeaders(id: number): void {}

  setInterceptorHeaders(headers: { [p: string]: string }): number {
    return 0;
  }
}
