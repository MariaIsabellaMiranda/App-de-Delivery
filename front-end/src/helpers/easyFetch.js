const easyFetch = async (url, headers, method, body) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  if (!method) delete options.method;
  if (!body) delete options.body;

  const response = await fetch(url, options);
  return response;
};

export default easyFetch;
