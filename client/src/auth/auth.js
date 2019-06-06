export function getAuth() {
  return JSON.parse(window.sessionStorage.getItem('user'))
}