import { api } from '../api'

//保存登录信息到本地
const saveLoginInfo = (SNO, token,username) => {
  localStorage.setItem("token", token);
  localStorage.setItem("SNO", SNO);
  localStorage.setItem("username", username);
};
//清除登录信息从本地
const clearLoginInfo = () => {
  localStorage.clear();
};

export const initState = {
  token: localStorage.getItem("token") ||'',
  SNO: localStorage.getItem("SNO") ||0,
  username:localStorage.getItem("username") ||''
};

export default {
  state: initState,
  reducers: {
    userLogin(state, payload) {
      state.token = payload.token;
      state.SNO = payload.SNO;
      state.username = payload.nickname;
      saveLoginInfo(payload.SNO, payload.token,payload.nickname);
      return state;
    },
    userLogout(state, payload) {
      clearLoginInfo();
      return state;
    },
  },
  effects: dispatch => ({
    async userLoginAsync(payload,rootState){
      const { account , password } = payload;
      const res = await api.user.loginByPassWord(account,password)
      dispatch.user.userLogin(res)
    }
  }),
};
