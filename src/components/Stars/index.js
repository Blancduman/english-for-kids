import Base from "../../helpers/baseClass";
import star from "../../assets/img/star.svg";
import starCooler from "../../assets/img/star-win.svg";

class Star extends Base {
  container;

  constructor() {
    super();

    this.container = this.createElement("div", { class: "stars" });

    return this;
  }

  addStar(type) {
    this.appendChildren(
      this.container,
      this.createElement("img", {
        src: type === "win" ? starCooler : star,
        alt: "STAR",
        width: "50px"
      })
    );
  }
}

export default Star;
