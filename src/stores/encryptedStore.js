import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const encryptedStore = {
  getItem: (key) => {
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.warn("Decryption failed:", e);
      return null;
    }
  },

  setItem: (key, value) => {
    const stringValue = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(
      stringValue,
      ENCRYPTION_KEY
    ).toString();
    sessionStorage.setItem(key, encrypted);
  },
};
