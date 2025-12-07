"use client";

import { cn } from "@/utils";
import React, { useEffect, useRef } from "react";

export const EvervaultCard = ({
	icon,
	className,
}: {
	icon?: React.ReactNode;
	className?: string;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let startTime = performance.now();
		
		const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
		const fontSize = 10;
		const density = 1.2; // Adjust spacing
		const LOCK_CYCLE_DURATION = 4000; // 4 seconds in milliseconds - matches lock animation

		// Handle resize
		const resize = () => {
			const parent = canvas.parentElement;
			if (parent) {
				const dpr = window.devicePixelRatio || 1;
				canvas.width = parent.clientWidth * dpr;
				canvas.height = parent.clientHeight * dpr;
				canvas.style.width = `${parent.clientWidth}px`;
				canvas.style.height = `${parent.clientHeight}px`;
				ctx.scale(dpr, dpr);
			}
		};

		resize();
		window.addEventListener("resize", resize);

		const draw = () => {
			const width = canvas.width / (window.devicePixelRatio || 1);
			const height = canvas.height / (window.devicePixelRatio || 1);

			ctx.clearRect(0, 0, width, height);

			// Use time-based animation to sync with lock (4-second cycle)
			const elapsed = (performance.now() - startTime) % LOCK_CYCLE_DURATION;
			const cycleProgress = elapsed / LOCK_CYCLE_DURATION; // 0 to 1
			const time = cycleProgress * Math.PI * 2; // Convert to radians for sin/cos
			
			// Center glow pulse
			const pulseScale = 1 + Math.sin(time * 0.5) * 0.1; 
			
			// Wave expansion - synchronized with 4-second lock animation cycle
			// Wave starts at center (0) when cycle starts (lock unlocks) and expands outward
			const maxRadius = Math.max(width, height) * 0.8;
			const waveRadius = cycleProgress * maxRadius; // 0 to maxRadius over 4 seconds
			const waveWidth = 150;

			ctx.font = `${fontSize}px monospace`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const cols = Math.ceil(width / (fontSize * density));
			const rows = Math.ceil(height / (fontSize * density));
			const centerX = width / 2;
			const centerY = height / 2;

			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const x = i * (fontSize * density) + (fontSize * density) / 2;
					const y = j * (fontSize * density) + (fontSize * density) / 2;

					// Distance from center
					const dx = x - centerX;
					const dy = y - centerY;
					const dist = Math.sqrt(dx * dx + dy * dy);

					// Calculate edge fade - distance from each edge
					const edgeFadeDistance = Math.min(width, height) * 0.15; // Fade over 15% of smaller dimension
					const distFromLeft = x;
					const distFromRight = width - x;
					const distFromTop = y;
					const distFromBottom = height - y;
					
					// Calculate fade factor for each edge (1 = fully visible, 0 = fully faded)
					const leftFade = Math.min(1, distFromLeft / edgeFadeDistance);
					const rightFade = Math.min(1, distFromRight / edgeFadeDistance);
					const topFade = Math.min(1, distFromTop / edgeFadeDistance);
					const bottomFade = Math.min(1, distFromBottom / edgeFadeDistance);
					
					// Combine edge fades (use minimum to fade if near any edge)
					const edgeFade = Math.min(leftFade, rightFade, topFade, bottomFade);

					// Base nebula/glow shape (circular with falloff)
					const maxDist = Math.min(width, height) * 0.6;
					let intensity = Math.max(0, 1 - dist / maxDist);
					
					// Sharpen the falloff to create a "spotlight" effect
					intensity = Math.pow(intensity, 3);

					// Add pulsing wave effect
					const distFromWave = Math.abs(dist - waveRadius);
					if (distFromWave < waveWidth) {
						const waveIntensity = Math.pow(1 - distFromWave / waveWidth, 2) * 0.6; // Stronger wave
						intensity += waveIntensity;
					}

					// Add subtle noise/twinkle
					const noise = Math.sin(x * 0.1 + elapsed * 0.001) * Math.cos(y * 0.1 + elapsed * 0.001) * 0.2;
					intensity += noise * intensity; // Only twinkle where visible

					// Clamp intensity
					intensity = Math.max(0, Math.min(1, intensity));
					
					// Apply edge fade to intensity
					intensity *= edgeFade;

					// Only draw if visible enough
					if (intensity > 0.01) {
						// Random character that scrambles constantly
						const randomChar = chars[Math.floor(Math.random() * chars.length)];
						
						// Reset shadow
						ctx.shadowBlur = 0;
						ctx.shadowColor = "transparent";

						// Threshold for "hot" glowing characters
						if (intensity > 0.5) {
							// Hot center / active wave part
							const alpha = Math.min(1, (intensity - 0.5) * 2); // Edge fade already applied to intensity
							
							// Intense Purple glow
							ctx.shadowBlur = 20 + (alpha * 10); // Variable blur
							ctx.shadowColor = `rgba(168, 85, 247, ${alpha})`; // Purple-500
							
							// Bright White/Blueish text
							ctx.fillStyle = `rgba(240, 240, 255, ${alpha})`;
							ctx.fillText(randomChar, x, y);
						} else {
							// Faded background text
							// Brighter background for more visibility
							const alpha = intensity * 0.8; // Edge fade already applied to intensity
							ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`; // Purple-600
							ctx.fillText(randomChar, x, y);
						}
					}
				}
			}

			animationFrameId = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div
			className={cn(
				"relative flex aspect-square h-full w-full items-center justify-center overflow-hidden bg-transparent",
				className,
			)}
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 h-full w-full"
				style={{
					maskImage: "radial-gradient(ellipse 80% 80% at center, black 70%, transparent 100%)",
					WebkitMaskImage: "radial-gradient(ellipse 80% 80% at center, black 70%, transparent 100%)",
				}}
			/>
			<div className="absolute inset-0 z-10 flex items-center justify-center">
				{/* Circle container with lock icon */}
				<div
					className="absolute flex size-32 items-center justify-center rounded-full border-2 border-violet-500/50 bg-background/95 p-6 shadow-2xl backdrop-blur-sm"
					style={{
						boxShadow:
							"0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(217, 70, 239, 0.6), 0 0 90px rgba(217, 70, 239, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.3)",
					}}
				>
					{icon}
				</div>
			</div>
		</div>
	);
};
