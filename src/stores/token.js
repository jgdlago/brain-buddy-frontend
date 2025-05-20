import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  state: () => ({ token: null }),

  actions: {
    set(token) {
      this.token = token;
    },
  },
});
