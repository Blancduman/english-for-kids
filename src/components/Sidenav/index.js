import "./sidenav.css";

class Sidenav {
  buttonOpen = null;
  sideNav = null;

  constructor(items) {
    this.buttonOpen = document.createElement("span");
    this.buttonOpen.classList.add("sidenav__open-btn");
    this.buttonOpen.onclick = this.openSidenav;

    this.sideNav = document.createElement("div");
    this.sideNav.classList.add("sidenav");

    const a = document.createElement("a");
    a.setAttribute("href", `/#`);
    a.textContent = "Main Page";
    a.onclick = this.closeSidenav;
    this.sideNav.append(a);
    const category = window.location.hash.split("/").pop();

    items.forEach(item => {
      const a = document.createElement("a");
      const path = item.replace(/\s/g, "").toLowerCase();
      a.setAttribute("href", `#category/${path}`);
      if (path === category) {
        a.classList.add("active");
      }
      a.textContent = item;
      a.onclick = this.closeSidenav;
      this.sideNav.append(a);
    });

    return this;
  }

  closeSidenav = () => {
    this.sideNav.style.width = "0";
    this.buttonOpen.classList.remove("sidenav__close-btn");
    this.buttonOpen.classList.add("sidenav__open-btn");
    this.buttonOpen.onclick = this.openSidenav;
  };

  openSidenav = () => {
    this.sideNav.style.width = "250px";
    this.buttonOpen.classList.remove("sidenav__open-btn");
    this.buttonOpen.classList.add("sidenav__close-btn");
    this.buttonOpen.onclick = this.closeSidenav;
  };
}

export default Sidenav;
