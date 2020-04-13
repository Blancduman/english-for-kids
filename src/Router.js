class Router {
  routes = null;
  rootElem = null;

  constructor(routes) {
    if (!routes) {
      throw "error: routes param is mandatory";
      return;
    }
    this.routes = routes;
    this.rootElem = document.getElementById("app");
  }

  init() {
    const r = this.routes;
    (function(scope, r) {
      window.addEventListener("hashchange", e => {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  }

  hasChanged(scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  }

  goToRoute(htmlName) {
    (function(scope) {
      const url = `views/${htmlName}`;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElem.innerHTML = this.response;
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    })(this);
  }
}
