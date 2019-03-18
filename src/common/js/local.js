export default {
  setString(key, value) {
    window.localStorage.setItem(key, value);
  },
  getString(key) {
    return window.localStorage.getItem(key);
  },
  setObject(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getObject(key) {
    const str = window.localStorage.getItem(key);
    if (str) {
      return JSON.parse(str);
    }
    return null;
  },
  clear() {
    window.localStorage.clear();
  },
  deleteItem(key) {
    window.localStorage.removeItem(key);
  }
};
