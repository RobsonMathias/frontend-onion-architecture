process.env.REACT_APP_API_URL = 'http://test';

global.window = {
  location: {
    pathname: 'pathname',
    reload: () => null
  }
};
