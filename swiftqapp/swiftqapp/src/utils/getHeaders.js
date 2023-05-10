export default function getHeaders() {
  let loginData, sessionToken;

  if (localStorage.getItem('loginResponse')) {
    loginData = JSON.parse(localStorage.getItem('loginResponse'));
    sessionToken = loginData.data.responseData.sessionToken;
  }
  let headers = {
    Authorization: sessionToken,
    'Content-Type': 'application/json',
  };
  return headers;
}
