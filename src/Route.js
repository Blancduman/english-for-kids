class Route {
  name = null;
  htmlname = null;
  default = null;

  constructor(name, htmlName, defaultRoute) {
    if (!name || !htmlName) {
      throw "error: name and htmlName params are mandatories";
      return;
    }
    this.name = name;
    this.htmlname = htmlName;
    this.default = defaultRoute;
  }

  isActiveRoute(hashedPath) {
    return hashedPath.replace("#", "") === this.name;
  }
}
