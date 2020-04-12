//todo How about GC
const memoizedParse =_.memoize(JSON.parse);
export const staticProp = (object) => {
  return memoizedParse(JSON.stringify(object));
};

//todo Fix unintentional caching results just like cache directive. Idea: Create own directive.
const dynamicElements = new WeakMap;
export const dynamicElement = (host, key, tagName, props) => {
  const dynamicElementsOfHost = dynamicElements.get(host) || new Map;
  dynamicElements.set(host, dynamicElementsOfHost);
  const element = dynamicElementsOfHost.get(key) || document.createElement(tagName);
  dynamicElementsOfHost.set(key, element);
  return Object.assign(element, props);
};
