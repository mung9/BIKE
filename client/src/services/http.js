import axios from "axios";
import { getAuth } from "../auth/auth";

// 5xx 상태에 대한 에러 핸들링
axios.interceptors.response.use(null, function(error) {
  const manyRequest = error.response.status === 429;
  if (manyRequest) {
    alert("너무 많은 요청을 하셨네요. 혹시 악의적인 의도가 있었던건 아닌가요?");
  }
  const expected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expected) {
    // Log exception using somthing like sentry.io
    alert("요청이 정상적으로 처리되지 않았습니다. 서버 문제일 수 있습니다.");
  }

  return Promise.reject(error);
});

function config() {
  const auth = getAuth();
  return auth
    ? {
        headers: {
          "x-auth-token": auth.token
        }
      }
    : {};
}

export default {
  get: (endPoint, data) => axios.get(endPoint, config()),
  post: (endPoint, data) => axios.post(endPoint, data, config()),
  put: (endPoint, data) => axios.put(endPoint, data, config()),
  delete: (endPoint, data) => axios.delete(endPoint, data, config())
};
