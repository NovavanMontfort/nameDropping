// Kleine wrapper die checkt of JS en touch aanwezig zijn,
// en voegt klassen toe aan de HTML tag voor eventueel CSS gebruik.
!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  n.className += t + "js";
  ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) &&
    (n.className += t + "touch");
})(window, document);


// Load image, get real width/height, create body
// --------------------------------------------------
// Deze functie maakt een Matter.js body op basis van een echte afbeelding.
// De afbeelding wordt eerst geladen zodat de width/height bekend zijn.
function loadImageBody(x, y, imgSrc, radius = 20) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      // Bepaal schaal op basis van schermbreedte
      const scale = getScaleForScreen();

      // Geschaalde afmetingen
      const scaledW = img.width * scale;
      const scaledH = img.height * scale;

      // Body aanmaken met geschaalde breedte/hoogte
      const body = Matter.Bodies.rectangle(x, y, scaledW, scaledH, {
        chamfer: { radius },
        render: {
          sprite: {
            texture: imgSrc,
            xScale: scale,
            yScale: scale
          }
        }
      });

      resolve(body);
    };
  });
}



// Start van de volledige Matter.js simulatie
// --------------------------------------------------
async function initSimulation() {
  // Matter.js modules importeren
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  // Fysica engine en wereld maken
  var engine = Engine.create(),
    world = engine.world;

  // Canvas container selecteren
  var containerElement = document.querySelector(".tag-canvas");
  var containerWidth = containerElement.clientWidth + 2;
  var containerHeight = containerElement.clientHeight + 2;

  // Renderer (canvas) maken
  var render = Render.create({
    element: containerElement,
    engine: engine,
    options: {
      width: containerWidth,
      height: containerHeight,
      pixelRatio: 2,          // scherpe rendering op retina
      background: "transparent",
      borderColor: "transparent",
      wireframes: false       // echte textures tonen ipv outlines
    }
  });

  var thickness = 50; // dikte van de onzichtbare muren

  // Vloer
  var ground = Bodies.rectangle(
    containerWidth / 2,
    containerHeight + thickness / 2,
    containerWidth,
    thickness,
    { isStatic: true }
  );

  // Plafond
  var roof = Bodies.rectangle(
    containerWidth / 2,
    -thickness / 2,
    containerWidth,
    thickness,
    { isStatic: true }
  );

  // Linker muur
  var wallLeft = Bodies.rectangle(
    -thickness / 2,
    containerHeight / 2,
    thickness,
    containerHeight,
    { isStatic: true }
  );

  // Rechter muur
  var wallRight = Bodies.rectangle(
    containerWidth + thickness / 2,
    containerHeight / 2,
    thickness,
    containerHeight,
    { isStatic: true }
  );

  // Alle PNG-logo’s laden en omzetten naar echte Matter.js bodies
const bodies = await Promise.all([
  loadImageBody(containerWidth * 0.1, 500, "/public/bim.png"),
  loadImageBody(containerWidth * 0.18, 460, "/public/checkpointIC.png"),
  loadImageBody(containerWidth * 0.26, 420, "/public/fairPlay.png"),
  loadImageBody(containerWidth * 0.34, 380, "/public/forumGroningen.png"),
  loadImageBody(containerWidth * 0.42, 540, "/public/gekkoo.png"),
  loadImageBody(containerWidth * 0.5, 490, "/public/luxaFlex.png"),
  loadImageBody(containerWidth * 0.58, 440, "/public/napoleonCasino.png"),
  loadImageBody(containerWidth * 0.66, 260, "/public/nederlandsKamerkoor.png"),
  loadImageBody(containerWidth * 0.74, 420, "/public/nieuweVeste.png"),
  loadImageBody(containerWidth * 0.82, 380, "/public/orkater.png"),
  loadImageBody(containerWidth * 0.9, 400, "/public/paradisoMelkweg.png"),
  loadImageBody(containerWidth * 0.26, 420, "/public/pinkpop.png"),
  loadImageBody(containerWidth * 0.95, 260, "/public/schouwburgCTilburg.png"),
  loadImageBody(containerWidth * 1.0, 260, "/public/vnab.png")
]);



  // Alle muren en logo bodies toevoegen aan de wereld
  World.add(engine.world, [ground, wallLeft, wallRight, roof, ...bodies]);

  // Mouse interactie activeren (slepen)
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false } // onzichtbare grijplijn
      }
    });

  World.add(world, mouseConstraint);
  render.mouse = mouse;

  // Scrollblokkades verwijderen (voorkomt rare zoom)
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  // Detecteren of iets een klik of drag was
  let click = false;

  document.addEventListener("mousedown", () => (click = true));
  document.addEventListener("mousemove", () => (click = false));
  document.addEventListener("mouseup", () =>
    console.log(click ? "click" : "drag")
  );

  // Klik-detectie voor hyperlinks op een body
  Events.on(mouseConstraint, "mouseup", function (event) {
    var mouseConstraint = event.source;
    var bodies = engine.world.bodies;

    // Alleen uitvoeren als er niet gesleept wordt
    if (!mouseConstraint.bodyB) {
      for (let i = 0; i < bodies.length; i++) {
        var body = bodies[i];
        if (click === true) {
          // Check of muis binnen de bounds van de body was
          if (
            Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)
          ) {
            var bodyUrl = body.url;

            if (bodyUrl != undefined) {
              window.open(bodyUrl, "_blank"); // open link
            }
            break;
          }
        }
      }
    }
  });

  // Reset van bodies die te hoog vliegen (failsafe)
  Events.on(engine, "beforeUpdate", function () {
    world.bodies.forEach((body) => {
      if (body.position.y < -100) {
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setPosition(body, { x: body.position.x, y: 0 });
      }
    });
  });

  // Engine + renderer starten
  Engine.run(engine);
  Render.run(render);
}

function getScaleForScreen() {
  const width = window.innerWidth;

  if (width < 480) return 0.45;  // kleine telefoon
  if (width < 768) return 0.6;   // grote telefoon / kleine tablets
  if (width < 1024) return 0.8;  // tablets
  return 1;                      // laptops / desktops
}

// Simulatie alleen starten wanneer het element in beeld komt
var containerElement = document.querySelector(".tag-canvas");
var observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initSimulation(); // start het pas wanneer zichtbaar
        observer.disconnect(); // één keer uitvoeren
      }
    });
  },
  {}
);

observer.observe(containerElement);
