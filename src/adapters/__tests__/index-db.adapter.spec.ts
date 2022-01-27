const mockGet = jest.fn(),
  mockPut = jest.fn(),
  mockAllDocs = jest.fn(),
  mockRemove = jest.fn();

function MockDb() {
  return {
    get: mockGet,
    put: mockPut,
    allDocs: mockAllDocs,
    remove: mockRemove
  };
}

jest.mock('pouchdb', (...arg) => MockDb);
import { IndexDbAdapter } from '../index-db.adapter';

describe('IndexDbAdapter', () => {
  let adapter: IndexDbAdapter = new IndexDbAdapter('test');

  it('should call delete successfully', async () => {
    mockGet.mockResolvedValue('mocked');
    mockRemove.mockResolvedValue('mocked');
    const response = await adapter.delete('key');
    expect(response).toEqual('mocked');
    expect(mockGet).toHaveBeenCalledWith('key');
    expect(mockRemove).toHaveBeenCalledWith('mocked');
  });

  it('should call delete with error', async () => {
    mockGet.mockRejectedValue('mocked');
    try {
      await adapter.delete('key');
    } catch (e) {
      expect(e).toEqual('mocked');
      expect(mockGet).toHaveBeenCalledWith('key');
      expect(mockRemove).not.toHaveBeenCalled();
    }
  });

  it('should call put successfully', () => {
    adapter.put('key', { mock: true });
    expect(mockPut).toHaveBeenCalled();
  });

  it('should call post successfully', () => {
    adapter.post('key', { mock: true });
    expect(mockPut).toHaveBeenCalled();
  });

  it('should call patch successfully', () => {
    adapter.patch('key', { mock: true });
    expect(mockPut).toHaveBeenCalled();
  });

  it('should call get successfully', async () => {
    mockAllDocs.mockResolvedValue({
      rows: [
        {
          doc: {
            _id: 123,
            mocked: true
          }
        }
      ]
    });
    const response = await adapter.get('key');
    expect(mockAllDocs).toHaveBeenCalledWith({ include_docs: true, startkey: 'key' });
    expect(response).toEqual({
      data: [
        {
          id: 123,
          _id: 123,
          mocked: true
        }
      ]
    });
  });

  it('should call removeInterceptorHeaders successfully', async () => {
    const response = adapter.removeInterceptorHeaders(0);
    expect(response).toBeUndefined();
  });

  it('should call setInterceptorHeaders successfully', async () => {
    const response = adapter.setInterceptorHeaders({});
    expect(response).toBe(0);
  });
});
