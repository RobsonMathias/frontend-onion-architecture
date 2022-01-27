declare global {
  interface Window {
    localStorage: any;
    sessionStorage: any;
  }
}

export * from './task';
export * from './store';
export * from './auth';
export * from './storage';
export * from './analytics';
