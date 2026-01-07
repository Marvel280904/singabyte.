"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const BLOCKS = [
  "web3",
  "finance",
  "healthcare",
  "government",
  "crypto",
  "marketing",
  "e-commerce",
  "education",
  "saas",
];

export default function BouncyBlocks() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);

  useEffect(() => {
    if (!sceneRef.current || !containerRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      Events,
      Body,
      Vector,
    } = Matter;

    /* ---------------- Engine ---------------- */
    const engine = Engine.create();
    engine.gravity.y = 0;
    engine.gravity.x = 0;

    /* ---------------- Sizes ---------------- */
    const getSize = () => ({
      width: containerRef.current!.clientWidth,
      height: containerRef.current!.clientHeight,
    });

    let { width, height } = getSize();

    /* ---------------- Renderer ---------------- */
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        background: "#000000",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    /* ---------------- Walls ---------------- */
    const wallThickness = 50;
    const createWalls = () => [
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ];

    let walls = createWalls();
    Composite.add(engine.world, walls);

    /* ---------------- 1. MAIN BLOCKS (Text) ---------------- */
    const mainBlocks = BLOCKS.map((label) =>
      Bodies.rectangle(
        Math.random() * (width - 200) + 100,
        Math.random() * (height - 200) + 100,
        120,
        40,
        {
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.001,
          chamfer: { radius: 4 },
          angle: (Math.random() - 0.5) * 0.5,
          render: { 
            fillStyle: "#0040FF",
            // @ts-ignore
            glowColor: "#0040FF" 
          },
          label: label, 
          // @ts-ignore
          isMainBlock: true 
        }
      )
    );

    /* ---------------- 2. FILLER PARTICLES ---------------- */
    const particles = Array.from({ length: 200 }).map(() => {
      const radius = Math.random() * 4 + 2; 
      return Bodies.circle(
        Math.random() * width,
        Math.random() * height,
        radius,
        {
          restitution: 0.8, 
          friction: 0.05,
          frictionAir: 0.02, 
          render: { 
            fillStyle: "#1a1a1a",
            // @ts-ignore
            glowColor: "#333333"
          },
          // @ts-ignore
          isParticle: true
        }
      );
    });

    Composite.add(engine.world, [...mainBlocks, ...particles]);

    /* ---------------- INITIAL PUSH ---------------- */
    mainBlocks.forEach(block => {
        const initialVelocity = {
            x: (Math.random() - 0.5) * 1.5, 
            y: (Math.random() - 0.5) * 1.5 
        };
        Body.setVelocity(block, initialVelocity);
        Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.05);
    });

    /* ---------------- Mouse Tracking ---------------- */
    const mouse = Mouse.create(render.canvas);
    render.mouse = mouse;
    // @ts-ignore
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // @ts-ignore
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    /* ---------------- EVENT HANDLERS (LOGIC FIX) ---------------- */
    
    // 1. Mouse Down (Hanya trigger jika di dalam container)
    const handleMouseDown = () => { 
        isMouseDown.current = true; 
    };

    // 2. Mouse Up (Trigger Big Bang HANYA jika sebelumnya sedang Hold Click)
    const handleMouseUp = () => { 
        if (isMouseDown.current) {
            explode();
            isMouseDown.current = false; 
        }
    };

    // Helper: Big Bang
    const explode = () => {
        const mousePosition = mouse.position;
        const allBodies = Composite.allBodies(engine.world);

        allBodies.forEach(body => {
            if (body.isStatic) return; 
            const forceMagnitude = 0.05 * body.mass; 
            const vector = Vector.sub(body.position, mousePosition);
            const direction = Vector.normalise(vector);
            Body.applyForce(body, body.position, Vector.mult(direction, forceMagnitude));
        });
    };

    containerRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp); 

    /* ---------------- PHYSICS LOOP ---------------- */
    Events.on(engine, "beforeUpdate", () => {
      const mousePosition = mouse.position;
      const allBodies = Composite.allBodies(engine.world);

      allBodies.forEach((body) => {
        if (body.isStatic) return;

        // --- BLACK HOLE (Hanya aktif jika klik dimulai dari dalam frame) ---
        if (isMouseDown.current) {
          const vector = Vector.sub(mousePosition, body.position);
          const direction = Vector.normalise(vector);
          const strength = 0.001 * body.mass; 
          Body.applyForce(body, body.position, Vector.mult(direction, strength));
        } 
        
        // --- IDLE STATE ---
        else {
          // 1. MAGNETIC REPEL
          const dx = body.position.x - mousePosition.x;
          const dy = body.position.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Cek batas jarak (200px) 
          if (distance < 200 && distance > 0) {
              const forceMagnitude = 0.001 * body.mass; 
              const force = Vector.mult(Vector.normalise({ x: dx, y: dy }), forceMagnitude);
              Body.applyForce(body, body.position, force);
          }

          // 2. SPEED MAINTENANCE
          // @ts-ignore
          if (body.isMainBlock) {
              if (body.speed < 0.5) {
                  const currentDir = Vector.normalise(body.velocity);
                  Body.setVelocity(body, Vector.mult(currentDir, 0.5));
              }
          }
        }
      });
    });

    /* ---------------- CUSTOM RENDER ---------------- */
    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const allBodies = Composite.allBodies(engine.world);

      allBodies.forEach((body) => {
        if (body.isStatic) return;

        const { x, y } = body.position;
        const angle = body.angle;
        // @ts-ignore
        const isMain = body.isMainBlock;
        // @ts-ignore
        const isParticle = body.isParticle;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const speedGlow = Math.min(body.speed * 2, 20); 
        
        if (isMain) {
            ctx.shadowColor = "#0040FF";
            ctx.shadowBlur = speedGlow; 
            ctx.fillStyle = "#0040FF";
            
            if (body.speed > 3) {
                ctx.strokeStyle = "#ffffff"; 
                ctx.lineWidth = 2;
                ctx.strokeRect(-60, -20, 120, 40);
            }
            
            ctx.beginPath();
            ctx.roundRect(-60, -20, 120, 40, 4);
            ctx.fill();

            ctx.shadowBlur = 0; 
            ctx.font = "bold 14px monospace";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`[ ${body.label} ]`, 0, 0);
        }

        if (isParticle) {
            ctx.shadowColor = "#333333";
            ctx.shadowBlur = speedGlow > 5 ? speedGlow : 0; 
            ctx.fillStyle = "#1a1a1a";
            ctx.beginPath();
            // @ts-ignore
            ctx.arc(0, 0, body.circleRadius, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();
      });
    });

    /* ---------------- Resize Handler ---------------- */
    const handleResize = () => {
      ({ width, height } = getSize());
      Render.setSize(render, width, height);
      Composite.remove(engine.world, walls);
      walls = createWalls();
      Composite.add(engine.world, walls);
    };

    window.addEventListener("resize", handleResize);

    /* ---------------- Run ---------------- */
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      Render.stop(render);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[600px] select-none cursor-crosshair active:cursor-grabbing"
    >
      <div ref={sceneRef} />
      {/* Frame Visual */}
      <div className="absolute inset-0 pointer-events-none z-20 border border-zinc-800">
        <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-blue" />
        <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-blue" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-blue" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-blue" />
      </div>

      {/* Hint UI */}
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none z-10 opacity-50">
          <p className="font-bold text-xs text-white uppercase tracking-widest">Hold Click to Absorb &bull; Release to Explode</p>
      </div>
    </div>
  );
}