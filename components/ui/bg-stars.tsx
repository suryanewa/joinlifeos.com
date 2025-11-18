"use client";

import { cn } from "@/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export interface StarsBackgroundProps {
	factor?: number;
	speed?: number;
	transition?: { stiffness?: number; damping?: number };
	starColor?: string;
	className?: string;
	children?: React.ReactNode;
	disableScrollFade?: boolean;
}

function hexToRgba(hex: string, alpha: number): string {
	// Handle both 3-digit and 6-digit hex colors
	let r: number, g: number, b: number;
	if (hex.length === 4) {
		// 3-digit hex like #fff
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else {
		// 6-digit hex like #ffffff
		r = parseInt(hex.slice(1, 3), 16);
		g = parseInt(hex.slice(3, 5), 16);
		b = parseInt(hex.slice(5, 7), 16);
	}
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function generateStars(count: number, starColor: string, withGlow = false) {
	const shadows: string[] = [];
	for (let i = 0; i < count; i++) {
		const x = Math.floor(Math.random() * 4000) - 2000;
		const y = Math.floor(Math.random() * 4000) - 2000;
		if (withGlow) {
			// Add glow effect with multiple shadow layers for realistic star appearance
			// Using simpler syntax: offset-x offset-y blur-radius color
			shadows.push(
				`${x}px ${y}px 0 ${starColor}`,
				`${x}px ${y}px 1px ${hexToRgba(starColor, 0.9)}`,
				`${x}px ${y}px 2px ${hexToRgba(starColor, 0.6)}`,
				`${x}px ${y}px 3px ${hexToRgba(starColor, 0.3)}`,
			);
		} else {
			shadows.push(`${x}px ${y}px ${starColor}`);
		}
	}
	return shadows.join(", ");
}

function generateSparkleStars(count: number, starColor: string) {
	const shadows: string[] = [];
	for (let i = 0; i < count; i++) {
		const x = Math.floor(Math.random() * 4000) - 2000;
		const y = Math.floor(Math.random() * 4000) - 2000;
		// Sparkle stars with stronger glow for twinkling effect
		shadows.push(
			`${x}px ${y}px 0 ${starColor}`,
			`${x}px ${y}px 2px ${hexToRgba(starColor, 1)}`,
			`${x}px ${y}px 4px ${hexToRgba(starColor, 0.7)}`,
			`${x}px ${y}px 6px ${hexToRgba(starColor, 0.4)}`,
		);
	}
	return shadows.join(", ");
}

export function StarsBackground({
	factor = 0.05,
	speed = 50,
	transition = { stiffness: 50, damping: 20 },
	starColor = "#fff",
	className,
	children,
	disableScrollFade = false,
}: StarsBackgroundProps): JSX.Element {
	const offsetX = useMotionValue(0);
	const offsetY = useMotionValue(0);

	const springX = useSpring(offsetX, transition);
	const springY = useSpring(offsetY, transition);

	const [boxShadow1, setBoxShadow1] = useState("");
	const [boxShadow2, setBoxShadow2] = useState("");
	const [boxShadow3, setBoxShadow3] = useState("");
	const [sparkleStars, setSparkleStars] = useState("");
	const opacity = useMotionValue(1);
	const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

	useEffect(() => {
		setBoxShadow1(generateStars(1000, starColor, true));
		setBoxShadow2(generateStars(400, starColor, true));
		setBoxShadow3(generateStars(200, starColor, true));
		setSparkleStars(generateSparkleStars(50, starColor));
	}, [starColor]);

	// Track scroll position and fade out stars when Marquee section comes into view
	useEffect(() => {
		if (disableScrollFade) {
			opacity.set(1);
			return;
		}

		const handleScroll = () => {
			const marqueeSection = document.getElementById("marquee");
			if (!marqueeSection) return;

			const marqueeTop = marqueeSection.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			// Start fading when Marquee section is approaching (within 100% of viewport height from top)
			// Fully fade out when Marquee section is at 50% of viewport height (before it's fully visible)
			const fadeStartDistance = windowHeight * 1.0; // Start fading when section is 100% of viewport height away
			const fadeEndDistance = windowHeight * 0.5; // Fully fade out when section is 50% of viewport height away

			if (marqueeTop <= fadeStartDistance) {
				if (marqueeTop <= fadeEndDistance) {
					// Fully faded out
					opacity.set(0);
				} else {
					// Calculate opacity: 1 when marqueeTop = fadeStartDistance, 0 when marqueeTop = fadeEndDistance
					// Progress goes from 0 to 1 as marqueeTop goes from fadeStartDistance to fadeEndDistance
					const progress = Math.max(
						0,
						Math.min(
							1,
							(fadeStartDistance - marqueeTop) /
								(fadeStartDistance - fadeEndDistance),
						),
					);
					opacity.set(1 - progress);
				}
			} else {
				opacity.set(1);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Check initial position

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disableScrollFade]);

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const newOffsetX = -(e.clientX - centerX) * factor;
		const newOffsetY = -(e.clientY - centerY) * factor;
		offsetX.set(newOffsetX);
		offsetY.set(newOffsetY);
	}

	const starLayer1Transition = useMemo(
		() => ({
			repeat: Infinity,
			duration: speed,
			ease: "linear" as const,
		}),
		[speed],
	);

	const starLayer2Transition = useMemo(
		() => ({
			repeat: Infinity,
			duration: speed * 2,
			ease: "linear" as const,
		}),
		[speed],
	);

	const starLayer3Transition = useMemo(
		() => ({
			repeat: Infinity,
			duration: speed * 3,
			ease: "linear" as const,
		}),
		[speed],
	);

	return (
		<motion.div
			className={cn("relative size-full", className)}
			onMouseMove={handleMouseMove}
			style={{ opacity: springOpacity }}
		>
			<motion.div style={{ x: springX, y: springY }}>
				{/* Star Layer 1 */}
				<motion.div
					className="absolute top-0 left-0 h-[2000px] w-full"
					animate={{ y: [0, -2000] }}
					transition={starLayer1Transition}
					style={{ willChange: "transform" }}
				>
					<div
						className="absolute top-0 left-0 rounded-full bg-transparent"
						style={{
							width: "1px",
							height: "1px",
							boxShadow: boxShadow1,
							pointerEvents: "none",
							willChange: "box-shadow",
						}}
					/>
					<div
						className="absolute top-[2000px] left-0 rounded-full bg-transparent"
						style={{
							width: "1px",
							height: "1px",
							boxShadow: boxShadow1,
							pointerEvents: "none",
							willChange: "box-shadow",
						}}
					/>
				</motion.div>

				{/* Star Layer 2 */}
				<motion.div
					className="absolute top-0 left-0 h-[2000px] w-full"
					animate={{ y: [0, -2000] }}
					transition={starLayer2Transition}
				>
					<div
						className="absolute top-0 left-0 rounded-full bg-transparent"
						style={{
							width: "2px",
							height: "2px",
							boxShadow: boxShadow2,
							pointerEvents: "none",
						}}
					/>
					<div
						className="absolute top-[2000px] left-0 rounded-full bg-transparent"
						style={{
							width: "2px",
							height: "2px",
							boxShadow: boxShadow2,
							pointerEvents: "none",
						}}
					/>
				</motion.div>

				{/* Star Layer 3 */}
				<motion.div
					className="absolute top-0 left-0 h-[2000px] w-full"
					animate={{ y: [0, -2000] }}
					transition={starLayer3Transition}
				>
					<div
						className="absolute top-0 left-0 rounded-full bg-transparent"
						style={{
							width: "3px",
							height: "3px",
							boxShadow: boxShadow3,
							pointerEvents: "none",
						}}
					/>
					<div
						className="absolute top-[2000px] left-0 rounded-full bg-transparent"
						style={{
							width: "3px",
							height: "3px",
							boxShadow: boxShadow3,
							pointerEvents: "none",
						}}
					/>
				</motion.div>

				{/* Sparkle Layer - Animated twinkling stars */}
				<motion.div
					className="absolute top-0 left-0 h-[2000px] w-full"
					animate={{ y: [0, -2000] }}
					transition={starLayer2Transition}
				>
					<motion.div
						className="absolute top-0 left-0 rounded-full bg-transparent"
						style={{
							width: "2px",
							height: "2px",
							boxShadow: sparkleStars,
							pointerEvents: "none",
						}}
						animate={{
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: "easeInOut",
							repeatType: "reverse",
						}}
					/>
					<motion.div
						className="absolute top-[2000px] left-0 rounded-full bg-transparent"
						style={{
							width: "2px",
							height: "2px",
							boxShadow: sparkleStars,
							pointerEvents: "none",
						}}
						animate={{
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 1.25,
							repeatType: "reverse",
						}}
					/>
				</motion.div>
			</motion.div>

			{/* Slot for child content */}
			{children}
		</motion.div>
	);
}
