import { StorageAdapter } from '../storage.adapter';
import { localStorage } from '@fixtures/mocks';

describe('StorageAdapter', () => {
  let adapter: StorageAdapter = new StorageAdapter(localStorage);
  beforeAll(() => {
    Date.now = jest.fn(() => 1612020896000);
  });

  it('should call delete successfully', () => {
    adapter.delete('key');
    expect(localStorage.removeItem).toHaveBeenCalledWith('key');
  });

  it('should call put successfully', () => {
    adapter.put('key', 'value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'key',
      '{"data":"value","createdAt":"1612020896000","dayToExpired":2}'
    );
  });

  it('should call post successfully', () => {
    adapter.post('key', 'value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'key',
      '{"data":"value","createdAt":"1612020896000","dayToExpired":2}'
    );
  });

  it('should call patch successfully', () => {
    adapter.patch('key', 'value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'key',
      '{"data":"value","createdAt":"1612020896000","dayToExpired":2}'
    );
  });

  it('should call get successfully', async () => {
    localStorage.getItem.mockReturnValue(
      '{"data":{"mock":true},"createdAt":1612020896000,"dayToExpired":2}'
    );
    const response = await adapter.get('key');
    expect(localStorage.getItem).toHaveBeenCalledWith('key');
    expect(response).toEqual({ mock: true });
  });

  it('should throw error with invalid object', async () => {
    localStorage.getItem.mockReturnValue('{123');
    await expect(adapter.get('key')).rejects.toThrowError('Unexpected number in JSON at position');
  });

  it('should throw error when element are not found', async () => {
    localStorage.getItem.mockReturnValue(undefined);
    await expect(adapter.get('key')).rejects.toThrowError('Element not found');
  });

  it('should throw error when element are expired', async () => {
    localStorage.getItem.mockReturnValue(
      '{"data":{"mock":true},"createdAt":1642514362102,"dayToExpired":2}'
    );
    await expect(adapter.get('key')).rejects.toThrowError('Element has expired');
    expect(localStorage.removeItem).toHaveBeenCalledWith('key');
  });

  it('should call clear successfully', () => {
    adapter.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should call removeInterceptorHeaders successfully', async () => {
    const response = adapter.removeInterceptorHeaders(0);
    expect(response).toBeUndefined();
  });

  it('should call setInterceptorHeaders successfully', async () => {
    const response = adapter.setInterceptorHeaders({});
    expect(response).toBe(0);
  });

  it('should return a expired data successfully', async () => {
    expect(StorageAdapter.hasExpired({ createdAt: 1642514362102, dayToExpired: 1 })).toBe(true);
  });

  it('should NOT return a expired data successfully', async () => {
    expect(StorageAdapter.hasExpired({ dayToExpired: 1 })).toBe(false);
  });
});
