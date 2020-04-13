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
    const close = document.createElement("span");
    close.classList.add("sidenav__close-btn");
    close.onclick = this.closeSidenav;

    this.sideNav.append(close);

    items.forEach(item => {
      const a = document.createElement("a");
      console.log(item.replace(" ", ""));
      a.setAttribute(
        "href",
        `/category#${item.replace(/\s/g, "").toLowerCase()}`
      );
      a.textContent = item;
      this.sideNav.append(a);
    });

    return this;
  }

  closeSidenav = () => {
    this.sideNav.style.width = "0";
  };

  openSidenav = () => {
    this.sideNav.style.width = "250px";
  };
}

export default Sidenav;
