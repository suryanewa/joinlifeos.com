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
		let ripples: { radius: number; opacity: number }[] = [];
		let frameCount = 0;

		const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
		const fontSize = 14;

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

			// Spawn ripples periodically
			if (frameCount % 120 === 0) { // Every ~2 seconds at 60fps
				ripples.push({ radius: 0, opacity: 1 });
			}

			// Move and update ripples
			for (let i = ripples.length - 1; i >= 0; i--) {
				ripples[i].radius += 1; // Expansion speed
				ripples[i].opacity -= 0.005; // Fade speed
				if (ripples[i].opacity <= 0) {
					ripples.splice(i, 1);
				}
			}

			ctx.font = `${fontSize}px monospace`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const cols = Math.ceil(width / fontSize);
			const rows = Math.ceil(height / fontSize);
			const centerX = width / 2;
			const centerY = height / 2;

			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const x = i * fontSize + fontSize / 2;
					const y = j * fontSize + fontSize / 2;

					// Calculate distance from center
					const dx = x - centerX;
					const dy = y - centerY;
					const dist = Math.sqrt(dx * dx + dy * dy);

					let intensity = 0;

					// Check interaction with ripples
					for (const ripple of ripples) {
						const distFromRipple = Math.abs(dist - ripple.radius);
						const rippleWidth = 60;
						if (distFromRipple < rippleWidth) {
							const rippleIntensity = Math.pow(1 - distFromRipple / rippleWidth, 2) * ripple.opacity;
							intensity = Math.max(intensity, rippleIntensity);
						}
					}

					// Base faint visibility
					intensity = Math.max(intensity, 0.05);

					// Reset shadow
					ctx.shadowBlur = 0;
					ctx.shadowColor = "transparent";

					// Determine color based on intensity
					if (intensity > 0.3) {
						// Bright glow in the ripple
						const randomChar = chars[Math.floor(Math.random() * chars.length)];
						const alpha = Math.min(1, intensity * 1.5);
						
						// Add purple glow effect
						ctx.shadowBlur = 8;
						ctx.shadowColor = `rgba(168, 85, 247, ${alpha * 0.8})`; // Purple-500 glow
						
						// White center with purple tint
						ctx.fillStyle = `rgba(230, 210, 255, ${alpha})`; 
						ctx.fillText(randomChar, x, y);
					} else {
						// Faint background
						const randomChar = chars[Math.floor(Math.random() * chars.length)];
						ctx.fillStyle = `rgba(139, 92, 246, ${intensity * 0.5})`; // Violet, slightly dimmer base
						ctx.fillText(randomChar, x, y);
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

