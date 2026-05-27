"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
    x3d: number;
    y3d: number;
    z3d: number;
    baseX3d: number;
    baseY3d: number;
    baseZ3d: number;
    
    x2d: number;
    y2d: number;
    lastX2d: number;
    lastY2d: number;
    zRot: number;
    
    length: number;
    width: number;
    hue: number;
    alpha: number;
}

export function AnimatedBackground() {
    const [isHovering, setIsHovering] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Smooth trailing effect for the background mouse glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const textX = useSpring(mouseX, springConfig);
    const textY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    // High performance Antigravity 3D Sphere Particle simulation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        const mouse = { x: 0, y: 0, active: false };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        // Initialize particles in a 3D Fibonacci Sphere matching the real https://antigravity.google
        // Increased to 680 for a soft, dense, high-definition mist aesthetic
        const numParticles = 680;
        const initParticles = () => {
            particles = [];
            const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
            const radius = Math.min(width, height) * 0.36; // Responsive sphere radius

            for (let i = 0; i < numParticles; i++) {
                const y = 1 - (i / (numParticles - 1)) * 2; // y ranges from 1 (top) to -1 (bottom)
                const rAtY = Math.sqrt(1 - y * y); // circle radius at height y
                const theta = phi * i; // golden angle increment

                const x = Math.cos(theta) * rAtY;
                const z = Math.sin(theta) * rAtY;

                // Scale to sphere coordinates
                const x3d = x * radius;
                const y3d = y * radius;
                const z3d = z * radius;

                // Height color mapping matching the real site: Bottom (yellow) -> Middle (pink/magenta) -> Top (blue)
                const yNormal = (y + 1) / 2; // Normalize to 0 to 1
                const hue = (60 - yNormal * 180 + 360) % 360;

                // Thinner, shorter dashes for a very delicate and modern visual mist
                const length = 4.5 + Math.random() * 3.5; // 4.5px to 8px length
                const particleWidth = 0.9 + Math.random() * 0.5; // 0.9px to 1.4px thickness
                const alpha = 0.35 + Math.random() * 0.45; // Depth-scaled base opacity

                particles.push({
                    x3d,
                    y3d,
                    z3d,
                    baseX3d: x3d,
                    baseY3d: y3d,
                    baseZ3d: z3d,
                    x2d: 0,
                    y2d: 0,
                    lastX2d: 0,
                    lastY2d: 0,
                    zRot: 0,
                    length,
                    width: particleWidth,
                    hue,
                    alpha
                });
            }

            // Set initial projected coordinates
            const centerX = width / 2;
            const centerY = height / 2;
            particles.forEach((p) => {
                const fov = 550;
                const scale = fov / (fov + p.z3d);
                const x2d = centerX + p.x3d * scale;
                const y2d = centerY + p.y3d * scale;
                p.x2d = x2d;
                p.y2d = y2d;
                p.lastX2d = x2d;
                p.lastY2d = y2d;
            });
        };

        resize();
        initParticles();

        window.addEventListener("resize", resize);

        const handleMouseMoveGlobal = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeaveGlobal = () => {
            mouse.active = false;
        };

        window.addEventListener("mousemove", handleMouseMoveGlobal);
        document.body.addEventListener("mouseleave", handleMouseLeaveGlobal);

        let time = 0;
        let rotateX = 0;
        let rotateY = 0;

        const render = () => {
            time += 1;
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const isDark = document.documentElement.classList.contains("dark");

            // Cohesive slow spin of the sphere
            const autoRotateY = time * 0.0016;
            const autoRotateX = Math.sin(time * 0.0004) * 0.1; // Gentle horizontal rocking

            // Mouse parallax tilt
            let mouseTargetRotX = 0;
            let mouseTargetRotY = 0;
            if (mouse.active) {
                mouseTargetRotX = -(mouse.y - centerY) * 0.0004;
                mouseTargetRotY = (mouse.x - centerX) * 0.0004;
            }

            // Interpolate rotation offsets
            rotateX += (mouseTargetRotX - rotateX) * 0.05;
            rotateY += (mouseTargetRotY - rotateY) * 0.05;

            const finalRotX = autoRotateX + rotateX;
            const finalRotY = autoRotateY + rotateY;

            const cosX = Math.cos(finalRotX);
            const sinX = Math.sin(finalRotX);
            const cosY = Math.cos(finalRotY);
            const sinY = Math.sin(finalRotY);

            // 1. Rotate & Project 3D coordinates, then calculate direct 2D screen space spring-warp
            particles.forEach((p) => {
                // Rigid 3D rotation of local base coordinates
                const x1 = p.x3d * cosY - p.z3d * sinY;
                const z1 = p.x3d * sinY + p.z3d * cosY;
                
                const yRot = p.y3d * cosX - z1 * sinX;
                const zRot = p.y3d * sinX + z1 * cosX;
                const xRot = x1;

                p.zRot = zRot; // Save depth for painter sorting

                const fov = 550;
                const scale = fov / (fov + zRot);
                const projX = centerX + xRot * scale;
                const projY = centerY + yRot * scale;

                let targetX = projX;
                let targetY = projY;

                if (mouse.active) {
                    const dx = projX - mouse.x;
                    const dy = projY - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const influenceRadius = 150; // Radius of clean circular repulsion bubble

                    if (dist < influenceRadius) {
                        // Quadratic force falloff to create a very clean, crisp boundary circle
                        const force = Math.pow(1 - dist / influenceRadius, 1.8) * 85;
                        const angle = Math.atan2(dy, dx);
                        targetX = projX + Math.cos(angle) * force;
                        targetY = projY + Math.sin(angle) * force;
                    }
                }

                // Spring physics directly on projected screen space coordinates for organic liquid warp
                p.x2d += (targetX - p.x2d) * 0.12;
                p.y2d += (targetY - p.y2d) * 0.12;
            });

            // 2. Painter's Depth Sorting (render background particles first, foreground last)
            const sortedParticles = [...particles].sort((a, b) => b.zRot - a.zRot);

            // 3. Draw projection dashes
            sortedParticles.forEach((p) => {
                const fov = 550;
                const scaleFactor = fov / (fov + p.zRot); // Perspective scaling factor

                if (p.x2d < -50 || p.x2d > width + 50 || p.y2d < -50 || p.y2d > height + 50) {
                    p.lastX2d = p.x2d;
                    p.lastY2d = p.y2d;
                    return;
                }

                // Project movement vector for elegant trailing velocity dashes
                let dx = p.x2d - p.lastX2d;
                let dy = p.y2d - p.lastY2d;
                let dist = Math.sqrt(dx * dx + dy * dy);

                // Initial default length if static
                if (dist < 0.1) {
                    dx = p.length * scaleFactor;
                    dy = 0;
                    dist = p.length * scaleFactor;
                }

                const drawLength = p.length * scaleFactor;
                const startX = p.x2d - (dx / dist) * (drawLength / 2);
                const startY = p.y2d - (dy / dist) * (drawLength / 2);
                const endX = p.x2d + (dx / dist) * (drawLength / 2);
                const endY = p.y2d + (dy / dist) * (drawLength / 2);

                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = p.width * scaleFactor;
                ctx.lineCap = "round";

                const displayAlpha = p.alpha * scaleFactor * (isDark ? 0.9 : 0.85);

                if (isDark) {
                    ctx.shadowBlur = 3 * scaleFactor;
                    ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, ${displayAlpha})`;
                    ctx.strokeStyle = `hsla(${p.hue}, 95%, 65%, ${displayAlpha})`;
                } else {
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = `hsla(${p.hue}, 90%, 50%, ${displayAlpha * 0.8})`;
                }

                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                ctx.restore();

                // Save coordinate for motion vector
                p.lastX2d = p.x2d;
                p.lastY2d = p.y2d;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMoveGlobal);
            document.body.removeEventListener("mouseleave", handleMouseLeaveGlobal);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Interactive Mouse Glow */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-primary-500/10 dark:bg-primary-500/15"
                style={{
                    x: textX,
                    y: textY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.5s ease"
                }}
            />

            {/* Ambient Background Shapes */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] bg-emerald-300/10 dark:bg-emerald-800/20"
            />

            <motion.div
                animate={{
                    x: [0, -70, 70, 0],
                    y: [0, -70, 70, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-teal-300/10 dark:bg-teal-900/10"
            />

            {/* Antigravity Canvas Particle Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        </div>
    );
}

