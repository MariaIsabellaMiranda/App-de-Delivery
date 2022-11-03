const easyFetch = async (url, method, headers, body) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  return response;
};

export default easyFetch;
