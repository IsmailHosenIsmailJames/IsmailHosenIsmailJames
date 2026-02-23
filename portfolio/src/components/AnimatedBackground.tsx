"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedBackground() {
    const [isHovering, setIsHovering] = useState(false);

    // Smooth trailing effect for the mouse
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
        </div>
    );
}
