import { Service } from 'services/service';
import { EventPayload } from '@types';

export class AnalyticsService {
  constructor(private service: Service) {}

  event(action: string, payload: EventPayload) {
    return this.service.post('event', { action, ...payload });
  }

  pageView() {
    return Promise.all([this.service.post('screen_view'), this.service.post('page_view')]);
  }
}
