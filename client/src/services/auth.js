import http from './http';

const endPoint = "api/auth";

export async function postAuth(user) {
  const response = await http.post(`${endPoint}`, user);
  return response;
}
