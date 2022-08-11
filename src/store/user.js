import { authApi } from "@/api";

export default {
  namespaced: true,

  state: {
    userId: null,
    username: null,
    roles: [],
  },

  getters: {
    userId: (state) => state.userId,
    username: (state) => state.username,
    isUser: (state) =>
      state.roles.some((role) => role.authority === "ROLE_USER"),
    isAdmin: (state) =>
      state.roles.some((role) => role.authority === "ROLE_ADMIN"),
    isOperatorRoles: (state) => {
      const operatorRoles = ["ROLE_ADMIN", "ROLE_USER"];
      return state.roles.some((role) => operatorRoles.includes(role.authority));
    },
    allUserRoles: (state) => state.roles.map((role) => role.authority),
  },

  mutations: {
    setUserParams(state, payload) {
      state.userId = payload.id;
      state.username = payload.username;
      state.roles = payload.authorities;
    },

    clearUserParams(state) {
      state.userId = null;
      state.username = null;
      state.roles = [];
    },
  },

  actions: {
    async login({ commit }, payload) {
      const formData = new FormData();
      formData.append("username", payload.username);
      formData.append("password", payload.password);

      // Todo: аналог ответа от бэка
      const data = await authApi.login(formData);
      //const data = {
      //  id: 42,
      //  username: "bupa@gmail.com",
      //  authorities: [{ authority: "ROLE_ADMIN" }, { authority: "ROLE_USER" }],
      //};

      commit("setUserParams", data);
      return data;
    },

    async getCurrent({ state, commit }) {
      if (!(state.userId && state.username && state.roles.length)) {
        // Todo: аналог ответа от бэка
        const data = await authApi.getCurrent();
        //const data = {
        //  id: 42,
        //  username: "bupa@gmail.com",
        //  authorities: [
        //    { authority: "ROLE_ADMIN" },
        //    { authority: "ROLE_USER" },
        //  ],
        //};

        commit("setUserParams", data);
      }
    },

    async logout({ commit }) {
      await authApi.logout();
      commit("clearUserParams");
    },
  },
};
