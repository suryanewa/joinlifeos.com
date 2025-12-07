"use client";

import { cn } from "@/utils";
import { motion } from "motion/react";

export const AnimatedLock = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("overflow-visible", className)}
		>
			<defs>
				<linearGradient id="lock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#a855f7" /> {/* violet-500 */}
					<stop offset="100%" stopColor="#d946ef" /> {/* fuchsia-500 */}
				</linearGradient>
			</defs>
			{/* Lock body - static */}
			<rect x="5" y="11" width="14" height="10" rx="2" ry="2" stroke="url(#lock-gradient)" />
			<circle cx="12" cy="16" r="1" stroke="url(#lock-gradient)" />

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
					times: [0, 0.05, 0.2, 0.7, 1], // Synced with ripple: locked at 0%, starts unlocking at 5% (wave begins), fully unlocked at 20% (wave expanding), starts locking at 70% (wave near edge), locked at 100% (cycle resets)
				}}
				stroke="url(#lock-gradient)"
			/>
		</svg>
	);
};
