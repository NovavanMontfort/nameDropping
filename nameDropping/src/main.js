!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  (n.className += t + "js"),
    ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch");
})(window, document);

function initSimulation() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  var engine = Engine.create(),
    world = engine.world;
  var containerElement = document.querySelector(".tag-canvas");
  var containerWidth = containerElement.clientWidth + 2;
  var containerHeight = containerElement.clientHeight + 2;

  var render = Render.create({
    element: containerElement,
    engine: engine,
    options: {
      width: containerWidth,
      height: containerHeight,
      pixelRatio: 2,
      background: "transparent",
      borderColor: "transparent",
      wireframes: false
    }
  });

  var thickness = 50; // dikte muur

var ground = Bodies.rectangle(
  containerWidth / 2,
  containerHeight + thickness / 2,
  containerWidth,
  thickness,
  { isStatic: true }
);

var roof = Bodies.rectangle(
  containerWidth / 2,
  -thickness / 2,
  containerWidth,
  thickness,
  { isStatic: true }
);

var wallLeft = Bodies.rectangle(
  -thickness / 2,
  containerHeight / 2,
  thickness,
  containerHeight,
  { isStatic: true }
);

var wallRight = Bodies.rectangle(
  containerWidth + thickness / 2,
  containerHeight / 2,
  thickness,
  containerHeight,
  { isStatic: true }
);


  var border = 0;
  var radius = 20;

  var tagBim = Bodies.rectangle(containerWidth / 2 + 150, 500, 164, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/bim.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  
  var tagCheckpointIC = Bodies.rectangle(containerWidth / 2 + 150, 460, 240, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/checkpointIC.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagFairPlay = Bodies.rectangle(containerWidth / 2 + 250, 420, 200, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/fairPlay.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagForumGroningen = Bodies.rectangle(containerWidth / 2 - 75, 380, 160, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/forumGroningen.png",
        xScale: 1,
        yScale: 1
      }
    }
  });

  var tagGekkoo = Bodies.rectangle(
    containerWidth / 2 - 74,
    540,
    248,
    56,
    {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture:
            "/public/gekkoo.png",
          xScale: 1,
          yScale: 1
        }
      }
    }
  );
  var tagLuxaFlex = Bodies.rectangle(containerWidth / 2 + 174, 490, 105, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/luxaFlex.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagNapoleonCasino = Bodies.rectangle(containerWidth / 2 - 142, 440, 186, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/napoleonCasino.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagNederlandsKamerkoor = Bodies.rectangle(containerWidth / 2 - 10, 260, 128, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/nederlandsKamerkoor.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagNieuweVeste = Bodies.rectangle(containerWidth / 2 - 242, 420, 168, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/nieuweVeste.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagOrkater = Bodies.rectangle(containerWidth / 2 + 60, 380, 155, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/orkater.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagParadisoMelkweg = Bodies.rectangle(containerWidth / 2, 360, 180, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/paradisoMelkweg.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagPinkpop = Bodies.rectangle(containerWidth / 2 - 59, 260, 172, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/pinkpop.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagSchouwburgCTilburg = Bodies.rectangle(containerWidth / 2 - 59, 260, 115, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/schouwburgCTilburg.png",
        xScale: 1,
        yScale: 1
      }
    }
  });
  var tagVnab = Bodies.rectangle(containerWidth / 2 - 59, 260, 210, 56, {
    chamfer: { radius: radius },
    render: {
      sprite: {
        texture:
          "/public/vnab.png",
        xScale: 1,
        yScale: 1
      }
    }
  });

  World.add(engine.world, [
    ground,
    wallLeft,
    wallRight,
    roof,
    tagBim,
    tagCheckpointIC,
    tagFairPlay,
    tagForumGroningen,
    tagGekkoo,
    tagLuxaFlex,
    tagNapoleonCasino,
    tagNederlandsKamerkoor,
    tagNieuweVeste,
    tagOrkater,
    tagParadisoMelkweg,
    tagPinkpop,
    tagSchouwburgCTilburg,
    tagVnab,
  ]);

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  render.mouse = mouse;

  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  let click = false;

  document.addEventListener("mousedown", () => (click = true));
  document.addEventListener("mousemove", () => (click = false));
  document.addEventListener("mouseup", () =>
    console.log(click ? "click" : "drag")
  );

  Events.on(mouseConstraint, "mouseup", function (event) {
    var mouseConstraint = event.source;
    var bodies = engine.world.bodies;
    if (!mouseConstraint.bodyB) {
      for (let i = 0; i < bodies.length; i++) {
      var body = bodies[i];
        if (click === true) {
          if (
            Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)
          ) {
            var bodyUrl = body.url;
            console.log("Body.Url >> " + bodyUrl);
            if (bodyUrl != undefined) {
              window.open(bodyUrl, "_blank");
              console.log("Hyperlink was opened");
            }
            break;
          }
        }
      }
    }
  });

  Events.on(engine, "beforeUpdate", function() {
  world.bodies.forEach(body => {
    if (body.position.y < -100) {
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setPosition(body, { x: body.position.x, y: 0 });
    }
  });
});

  Engine.run(engine);
  Render.run(render);
}

var containerElement = document.querySelector(".tag-canvas");
var observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      initSimulation();
      observer.disconnect();
    }
  });
}, {});

observer.observe(containerElement);
