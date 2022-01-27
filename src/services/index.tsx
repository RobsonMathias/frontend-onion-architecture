import React, { useContext } from 'react';
import { TaskService } from './task.service';
import { AuthService } from './auth.service';
import { AnalyticsService } from './analytics.service';
import { AnalyticsAdapter, ApiAdapter, IndexDbAdapter, StorageAdapter } from 'adapters';

const analytics = new AnalyticsAdapter({});
const storage = new StorageAdapter(localStorage);
const indexDB = new IndexDbAdapter(process.env.REACT_APP_LOCAL_DB as string);
const api = new ApiAdapter(process.env.REACT_APP_API_URL as string);

export type ServiceContextData = {
  auth: AuthService;
  task: TaskService;
  analytics: AnalyticsService;
};

const initialServiceContext = configService();

function configService(): ServiceContextData {
  return {
    auth: new AuthService(storage),
    analytics: new AnalyticsService(analytics),
    task: new TaskService(indexDB)
  };
}

export const ServicesContext = React.createContext<ServiceContextData>(initialServiceContext);
export const ServicesProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <ServicesContext.Provider value={initialServiceContext}>{children}</ServicesContext.Provider>
  );
};
export const useService = () => {
  return useContext(ServicesContext);
};
