export default (propName, Class) => {
  let unsubscribe;
  return class extends Class {
    constructor(...args) {
      super(...args);
      this[propName] = true;
      unsubscribe = firebase.auth().onAuthStateChanged((user) => this[propName] = Boolean(user));
    }
    disconnectedCallback() {
      unsubscribe();
      return super.disconnectedCallback();
    }
  };
};
