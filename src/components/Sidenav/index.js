import "./sidenav.css";

class Sidenav {
  buttonOpen = null;
  sideNav = null;

  constructor(items) {
    this.buttonOpen = document.createElement("span");
    this.buttonOpen.setAttribute("style", "cursor: point;");
    this.buttonOpen.onclick = "";
    this.buttonOpen.textContent = "&#9776;";

    this.sideNav = document.createElement("div");
    this.sideNav.classList.add("sidenav");
    const close = document.createElement("a");
    close.setAttribute("href", "javascript:void(0)");
    close.classList.add("sidenav__close-btn");
    close.onclick = closeSidenav;
    close.textContent = "&times;";

    this.sideNav.append(close);

    items.forEach(item => {
      const a = document.createElement("a");
      a.setAttribute("href", item.link);
      this.sideNav.append(a);
    });

    return this;
  }

  closeSidenav() {
    this.sideNav.style.width = "0";
  }

  openSidenav() {
    this.sideNav.style.width = "250px";
  }
}

export default Sidenav;
