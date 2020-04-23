import { getState } from "../../store";
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

    const category = window.location.hash.split("/").pop();
    const a = document.createElement("a");
    a.setAttribute("href", `/#`);
    if ("" === category) {
      a.classList.add("active");
    }
    a.textContent = "Main Page";
    a.onclick = this.closeSidenav;
    this.sideNav.append(a);

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

    const statistic = document.createElement("a");
    statistic.setAttribute("href", `/#statistics`);
    statistic.textContent = "Statistics";
    if (category === "statistics") {
      statistic.classList.add("active");
    }
    statistic.onclick = this.closeSidenav;
    this.sideNav.append(statistic);

    this.changeColor();
    this.startUp();
    return this;
  }

  pathChanged = () => {
    const as = this.sideNav.querySelectorAll("a");
    as.forEach(el => el.classList.remove("active"));
    const category = window.location.hash.split("/").pop();
    if (category === "") {
      as[0].classList.add("active");
    } else if (
      as[as.length - 1].getAttribute("href").slice(2) === category.slice(1)
    ) {
      as[as.length - 1].classList.add("active");
    } else {
      for (let i = 1; i < as.length - 1; i++) {
        const path = as[i].getAttribute("href").slice(10);
        if (path === category) {
          as[i].classList.add("active");
          break;
        }
      }
    }
  };

  startUp = () => {
    window.addEventListener("click", e => {
      if (!(this.sideNav === e.target || this.buttonOpen === e.target)) {
        this.closeSidenav();
      }
    });
  };

  changeColor = () => {
    if (getState().play) {
      this.sideNav.classList.remove("green");
      this.sideNav.classList.add("greenwhatisyourproblemgreen");
    } else {
      this.sideNav.classList.remove("greenwhatisyourproblemgreen");
      this.sideNav.classList.add("green");
    }
  };

  closeSidenav = e => {
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
