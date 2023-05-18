class Particle {
  constructor(xPos, yPos, radius) {
    this.initialX = xPos;
    this.initialY = yPos;
    this.x = xPos;
    this.y = yPos;
    this.r = radius;
    this.svgElement;

    //Moving towards the centre of the svg
    this.speedNumber = randomNum(0.01, 0.025);
    this.velocityX = (width / 2 - xPos) * this.speedNumber;
    this.velocityY = (height / 2 - yPos) * this.speedNumber;
    this.active = true;
    this.colour = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
  }

  drawParticle() {
    this.svgElement = makeCircle(this.x, this.y, this.r, this.colour);
    svg.appendChild(this.svgElement);
    this.updatedParticle();
  }

  updatedParticle() {
    const updatedPosition = () => {
      if (!this.active) return;
      this.x += this.velocityX;
      this.y += this.velocityY;

      //The particle is removed once it reaches the centre of the svg and is recirculated.
      if (Math.abs(this.x - width / 2) < 5 && Math.abs(this.y - height / 2) < 5) {
        svg.removeChild(this.svgElement);
        this.active = false;
        let particleX = randomNum(0, width);
        let particleY = randomNum(0, height);
        let particleSize = randomNum(width * 0.003, width * 0.009);
        let newParticle = new Particle(particleX, particleY, particleSize);
        newParticle.drawParticle();
        return;
      }

      this.svgElement.setAttribute('cx', this.x);
      this.svgElement.setAttribute('cy', this.y);
    };
    setInterval(updatedPosition, 25);
  }

}


const createParticleArray = (num) => {
  let particleInstances = []

  for (let i = 0; i < num; i++) {
    let particleX = randomNum(0, 800);
    let particleY = randomNum(0, 800);
    let particleSize = randomNum(width * 0.005, width * 0.009);
    particleInstances.push(new Particle(particleX, particleY, particleSize));
  }
  return particleInstances
}

let width = 900;
let height = 700;

const svg = document.getElementById("base-svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("style", "background-color: black")

let particles = createParticleArray(50);

for (let particle of particles) {
  particle.drawParticle();
}
