let judul;
let nama;
let nim;
let tombol;
let hello;
let objek;
let jalan = false;
let grawforce;
let windforce;

function setup() {
  createCanvas(windowWidth, windowHeight);

  judul = createElement('h2', 'Simulasi Hukum Newton');
  judul.position(30, 15);

  nama = createElement('h3', 'Nama: Shela Azzura');
  nama.position(30, 50);

  nim = createElement('h3', 'NIM: 121160077');
  nim.position(30, 80);

  tombol = createButton('Jalankan/Pause');
  tombol.position(31, 130);
  tombol.mousePressed(run);

  objekPos = createVector(width / 10, height / 2);
  objekVel = createVector(0, 0);
  objekAcc = createVector(0, 0);
  objekMass = 10;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);

  grawforce = createVector(0, objek.mass * 0.1);
  windforce = createVector(0.1, 0);
}

function draw() {
  background(220);
  objek.display();

  var Cd = 0.0005;
  var diam1 = 2 * objek.mass;
  var A1 = PI * diam1 / 2;
  var frictionForce1 = objek.velocity.copy();
  frictionForce1.normalize();
  frictionForce1.mult(-1 * pow(frictionForce1.mag(), 2) * A1 * Cd);

  objek.applyForce(grawforce);
  objek.applyForce(windforce);
  objek.applyForce(frictionForce1);

  if (jalan) {
    objek.update();
  }
}

class Mover {
  constructor(loc, vel, acc, m) {
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display() {
    noStroke();
    fill('blue');
    ellipse(this.location.x, this.location.y, 2 * this.mass, 2 * this.mass);
  }

  applyForce(force) {
    force.div(this.mass);
    this.acceleration.add(force);
  }
}

function run() {
  jalan = !jalan;
}