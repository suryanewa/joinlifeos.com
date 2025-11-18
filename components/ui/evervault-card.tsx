"use client";
import { cn } from "@/utils";
import { useMotionValue } from "motion/react";
import { motion, useMotionTemplate } from "motion/react";
import { useEffect, useState } from "react";

export const EvervaultCard = ({
	text,
	icon,
	className,
}: {
	text?: string;
	icon?: React.ReactNode;
	className?: string;
}) => {
	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	const [randomString, setRandomString] = useState("");

	useEffect(() => {
		let str = generateRandomString(1500);
		setRandomString(str);
	}, []);

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		let { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);

		const str = generateRandomString(1500);
		setRandomString(str);
	}

	return (
		<div
			className={cn(
				"relative flex aspect-square h-full w-full items-center justify-center overflow-hidden bg-transparent p-0.5",
				className,
			)}
		>
			<div
				onMouseMove={onMouseMove}
				className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-0 bg-transparent"
			>
				<CardPattern
					mouseX={mouseX}
					mouseY={mouseY}
					randomString={randomString}
				/>
				<div className="relative z-10 flex items-center justify-center">
					{/* Wide expanding ripples */}
					<div className="absolute h-64 w-64 animate-pulse-wide rounded-full border-2 border-white/60 [animation-delay:0s]" />
					<div className="absolute h-64 w-64 animate-pulse-wide rounded-full border-2 border-white/40 [animation-delay:0.7s]" />
					<div className="absolute h-64 w-64 animate-pulse-wide rounded-full border-2 border-white/20 [animation-delay:1.4s]" />

					<div className="relative flex h-44 w-44 items-center justify-center rounded-full font-bold text-4xl text-white">
						<div className="absolute h-full w-full rounded-full bg-white/[0.8] blur-sm dark:bg-white/[0.8]" />
						<span className="z-20 animate-lock-float text-violet-500 dark:text-violet-400">
							{icon || text}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
	let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
	let style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div className="pointer-events-none">
			<div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
			<motion.div
				className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
				style={style}
			/>
			<motion.div
				className="absolute inset-0 rounded-2xl opacity-40 mix-blend-overlay"
				style={style}
			>
				<p className="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-bold font-mono text-blue-200/90 text-xs transition duration-500 [text-shadow:0_0_10px_rgba(147,197,253,0.8),0_0_20px_rgba(147,197,253,0.5),0_0_30px_rgba(147,197,253,0.3)]">
					{randomString}
				</p>
			</motion.div>
		</div>
	);
}

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const Icon = ({ className, ...rest }: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
		</svg>
	);
};
