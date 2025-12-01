"use client";

import { cn } from "@/utils";
import { motion } from "motion/react";

export const AnimatedLock = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("overflow-visible", className)}
		>
			{/* Lock body - static */}
			<rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
			<circle cx="12" cy="16" r="1" />

			{/* Lock shackle - animated */}
			<motion.path
				d="M7 11V7a5 5 0 0 1 10 0v4"
				initial={{ d: "M7 11V7a5 5 0 0 1 10 0v4" }}
				animate={{
					d: [
						"M7 11V7a5 5 0 0 1 10 0v4", // Locked
						"M7 11V7a5 5 0 0 1 10 0v4", // Locked (pause)
						"M7 11V5a5 5 0 0 1 10 0v2", // Unlocking
						"M7 11V5a5 5 0 0 1 10 0v2", // Unlocked (pause)
						"M7 11V7a5 5 0 0 1 10 0v4", // Locking back
					],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut",
					times: [0, 0.3, 0.5, 0.7, 1],
				}}
			/>
		</svg>
	);
};
