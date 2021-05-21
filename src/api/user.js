import request from "../utils/request";

export const user = {
  loginByPassWord(account, password) {
    if (typeof account !== "string") {
      throw new TypeError(`invalid params ${typeof account}`);
    }
    if (typeof password !== "string") {
      throw new TypeError(`invalid params ${typeof account}`);
    }
    let url = "/api/admin/user/account/admin-login";
    return request.post(url, {
      SNO: account,
      password,
    });
  },
};
