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
		let frameCount = 0;
		
		const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
		const fontSize = 10;
		const density = 1.2; // Adjust spacing

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

			// Animation variables
			const time = frameCount * 0.05;
			
			// Center glow pulse
			const pulseScale = 1 + Math.sin(time * 0.5) * 0.1; 
			
			// Wave expansion
			const waveRadius = (frameCount * 2) % (Math.max(width, height) * 0.8);
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
					const noise = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time) * 0.2;
					intensity += noise * intensity; // Only twinkle where visible

					// Clamp intensity
					intensity = Math.max(0, Math.min(1, intensity));

					// Only draw if visible enough
					if (intensity > 0.01) {
						const randomChar = chars[Math.floor(((x + y) * 0.1 + time) % chars.length)];
						
						// Reset shadow
						ctx.shadowBlur = 0;
						ctx.shadowColor = "transparent";

						// Threshold for "hot" glowing characters
						if (intensity > 0.5) {
							// Hot center / active wave part
							const alpha = Math.min(1, (intensity - 0.5) * 2); // Smoother transition
							
							// Intense Purple glow
							ctx.shadowBlur = 20 + (alpha * 10); // Variable blur
							ctx.shadowColor = `rgba(168, 85, 247, ${alpha})`; // Purple-500
							
							// Bright White/Blueish text
							ctx.fillStyle = `rgba(240, 240, 255, ${alpha})`;
							ctx.fillText(randomChar, x, y);
						} else {
							// Faded background text
							// Brighter background for more visibility
							const alpha = intensity * 0.8;
							ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`; // Purple-600
							ctx.fillText(randomChar, x, y);
						}
					}
				}
			}

			frameCount++;
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
			/>
			<div className="relative z-10">{icon}</div>
		</div>
	);
};
