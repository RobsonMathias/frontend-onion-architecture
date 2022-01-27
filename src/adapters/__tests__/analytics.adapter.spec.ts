import { AnalyticsAdapter } from '../analytics.adapter';

const serviceMock = jest.fn();

describe('AnalyticsAdapter', () => {
  let adapter: AnalyticsAdapter = new AnalyticsAdapter(serviceMock);

  it('should call delete successfully', async () => {
    const response = await adapter.delete('key');
    expect(response).toBeUndefined();
    expect(serviceMock).not.toHaveBeenCalled();
  });

  it('should call put successfully', () => {
    adapter.put('key', 'value');
    expect(serviceMock).toHaveBeenCalledWith('key', 'value');
  });

  it('should call post successfully', () => {
    adapter.post('key', 'value');
    expect(serviceMock).toHaveBeenCalledWith('key', 'value');
  });

  it('should call patch successfully', () => {
    adapter.patch('key', 'value');
    expect(serviceMock).toHaveBeenCalledWith('key', 'value');
  });

  it('should call get successfully', async () => {
    const response = await adapter.get('key');
    expect(response).toBeUndefined();
    expect(serviceMock).not.toHaveBeenCalled();
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
