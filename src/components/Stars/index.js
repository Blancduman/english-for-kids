import star from "../../assets/img/star.svg";
import starCooler from "../../assets/img/star-win.svg";

class Star {
  stars = [];
  constructor(amount, type) {
    this.renderStars(amount, type === "win" ? starCooler : star);
    return this.stars;
  }

  renderStars(amount, starch) {
    for (let i = 0; i < amount; i++) {
      const img = document.createElement("img");
      img.setAttribute("src", starch);
      img.setAttribute("alt", "STAR");
      img.setAttribute("width", "60px");
      this.stars.push(img);
    }
  }
}

export default Star;
