import { defineStore } from "pinia";
import { encryptedStore } from "./encryptedStore";

export const useUserStore = defineStore("user", {
  state: () => ({ id: null, token: null, name: "user" }),

  actions: {
    setUser(token, id, name) {
      this.token = token;
      this.id = id;
      this.name = name;
    },
    logout() {
      (this.token = ""), (this.id = ""), (this.name = "");
    },
  },

  persist: {
    storage: encryptedStore,
  },
});
