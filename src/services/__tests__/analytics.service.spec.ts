import { AnalyticsService } from '../analytics.service';
import { mockServiceInstance } from '@fixtures/mocks';

describe('AnalyticsService', () => {
  let service: AnalyticsService = new AnalyticsService(mockServiceInstance);

  it('should call event successfully', async () => {
    await service.event('key', {
      event_label: 'event_label',
      event_category: 'event_category',
      value: 'value'
    });
    expect(mockServiceInstance.post).toHaveBeenCalledWith('event', {
      action: 'key',
      event_category: 'event_category',
      event_label: 'event_label',
      value: 'value'
    });
  });

  it('should call pageView successfully', async () => {
    await service.pageView();
    expect(mockServiceInstance.post).toHaveBeenCalledWith('page_view');
    expect(mockServiceInstance.post).toHaveBeenCalledWith('screen_view');
  });
});
