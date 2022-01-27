import { mockHttp } from '@fixtures/mocks-integration';

jest.mock('axios', () => ({
  create: () => mockHttp
}));

import { ApiAdapter } from '../api.adapter';

describe('ApiAdapter', () => {
  let adapter: ApiAdapter = new ApiAdapter('test');

  it('should call delete successfully', async () => {
    mockHttp.delete.mockResolvedValue('mocked');
    const response = await adapter.delete('key');
    expect(response).toEqual('mocked');
    expect(mockHttp.delete).toHaveBeenCalledWith('key');
  });

  it('should call put successfully', () => {
    adapter.put('key', { mock: true });
    expect(mockHttp.put).toHaveBeenCalled();
  });

  it('should call post successfully', () => {
    adapter.post('key', { mock: true });
    expect(mockHttp.post).toHaveBeenCalledWith('key', { mock: true });
  });

  it('should call patch successfully', () => {
    adapter.patch('key', { mock: true });
    expect(mockHttp.patch).toHaveBeenCalledWith('key', { mock: true });
  });

  it('should call get successfully', async () => {
    mockHttp.get.mockResolvedValue({
      mocked: true
    });
    const response = await adapter.get('key');
    expect(mockHttp.get).toHaveBeenCalledWith('key');
    expect(response).toEqual({
      mocked: true
    });
  });

  it('should call removeInterceptorHeaders successfully', async () => {
    adapter.removeInterceptorHeaders(0);
    expect(mockHttp.interceptors.request.eject).toHaveBeenCalledWith(0);
  });

  it('should call setInterceptorHeaders successfully', async () => {
    mockHttp.interceptors.request.use.mockImplementation((callback: any) =>
      callback({ headers: {} })
    );
    const response = adapter.setInterceptorHeaders({
      mocked: 'mocked'
    });
    expect(response).toEqual({
      headers: {
        mocked: 'mocked'
      }
    });
  });
});
