import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ id: null, token: null, name: "user" }),

  actions: {
    setUser(token, id, name) {
      this.token = token;
      this.id = id;
      this.name = name;
    },
  },
});
