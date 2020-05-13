class BaseClass {
  appendChildren = (el, ...children) => {
    if (!el) return null;

    if (!children.length) return el;

    const elements = children.filter((item) => item);

    el.append(...elements);

    return el;
  };

  createElement = (node, attributes, listeners, ...children) => {
    if (!node) return null;

    const el = document.createElement(node);

    if (attributes && typeof attributes === 'object') {
      Object.entries(attributes).forEach(([key, value]) => {
        if (value) {
          el.setAttribute(key, value);
        }
      });
    }

    if (listeners && typeof listeners === 'object') {
      Object.entries(listeners).forEach(([type, event]) => {
        el.addEventListener(type, (e) => event(e));
      });
    }

    return this.appendChildren(el, ...children);
  };

  removeClass = (el, classList) => {
    if (!el) return null;

    const classArray = Array.isArray(classList) ? classList : [classList];

    classArray.forEach((cl) => {
      el.classList.remove(cl);
    });

    return el;
  };


  addClass = (el, classList) => {
    if (!el) return null;

    const classArray = Array.isArray(classList) ? classList : [classList];

    classArray.forEach((cl) => {
      el.classList.add(cl);
    });

    return el;
  };
}

export default BaseClass;
