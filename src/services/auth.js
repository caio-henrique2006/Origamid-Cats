export class Auth {
  isAuthenticated() {
    return localStorage.getItem("token") ? true : false;
  }

  login() {
    localStorage.setItem("token", "123456789");
    return true;
  }

  logout() {
    localStorage.removeItem("token");
    return true;
  }

  register() {}

  delete() {}
}
