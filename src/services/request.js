const requestService = {
  apiUrl: '',
  setApiUrl: apiUrl => {
    requestService.apiUrl = apiUrl;
  },
  makeRequest: (method, path = '/', body = null, queryString = '') => {
    if (!requestService.apiUrl) {
      return Promise.reject({ message: 'apiUrl has not been set' });
    }
    const request = new Request(`${requestService.apiUrl}${path}?${queryString}`, {
      method,
      body: body && JSON.stringify(body),
      credentials: 'include',
      headers: {
        'Accept': 'application/json', // eslint-disable-line quote-props
        'Content-Type': 'application/json',
        'authentication': localStorage.getItem('password'), // eslint-disable-line quote-props
      },
    });

    return fetch(request)
      .then(response => (
        response.status >= 200 && response.status < 300
          ? Promise.resolve(response)
          : Promise.reject(new Error('Something went wrong'))
      ))
      .then(response => response.json());
  },
  makeExternalRequest: (method, url, body = null, queryString = '') => {
    const request = new Request(`${url}?${queryString}`, {
      method,
      body: body && JSON.stringify(body),
      credentials: 'include',
      headers: {
        'Accept': 'application/json', // eslint-disable-line quote-props
        'Content-Type': 'application/json',
      },
    });

    return fetch(request)
      .then(response => (
        response.status >= 200 && response.status < 300
          ? Promise.resolve(response)
          : Promise.reject(new Error('Something went wrong'))
      ))
      .then(response => response.json());
  },

};

export default requestService;
