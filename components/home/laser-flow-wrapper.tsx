"use client";

import { LaserFlow } from "@/components/LaserFlow";
import { useEffect, useState } from "react";

export function LaserFlowWrapper() {
	const [opacity, setOpacity] = useState(1);
	const [isMounted, setIsMounted] = useState(false);
	const [containerHeight, setContainerHeight] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) return;

		const updateHeight = () => {
			// Find the demo card and calculate height from top of hero to bottom of demo card
			const demoCard = document.getElementById("demo-card");
			const heroSection =
				document.querySelector('[id="home"]')?.parentElement?.parentElement;

			if (demoCard && heroSection) {
				const heroTop =
					heroSection.getBoundingClientRect().top + window.scrollY;
				const demoCardBottom =
					demoCard.getBoundingClientRect().bottom + window.scrollY;
				const totalHeight = demoCardBottom - heroTop;
				setContainerHeight(totalHeight);
			} else if (heroSection) {
				// Fallback to hero section height
				setContainerHeight(heroSection.scrollHeight);
			}
		};

		// Initial calculation with delay to ensure DOM is ready
		const timeoutId = setTimeout(updateHeight, 100);
		window.addEventListener("resize", updateHeight);
		window.addEventListener("scroll", updateHeight);

		// Use MutationObserver to watch for content changes
		const observer = new MutationObserver(updateHeight);
		const heroSection =
			document.querySelector('[id="home"]')?.parentElement?.parentElement;
		if (heroSection) {
			observer.observe(heroSection, {
				childList: true,
				subtree: true,
				attributes: true,
			});
		}

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("resize", updateHeight);
			window.removeEventListener("scroll", updateHeight);
			observer.disconnect();
		};
	}, [isMounted]);

	useEffect(() => {
		if (!isMounted) return;

		const handleScroll = () => {
			const demoCard = document.getElementById("demo-card");
			if (!demoCard) {
				// If demo card not found, keep laser visible
				setOpacity(1);
				return;
			}

			const demoCardTop = demoCard.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			// Start fading when demo card is at 50% of viewport height
			// Fully fade out when demo card is at -20% (scrolled past)
			const fadeStartDistance = windowHeight * 0.5;
			const fadeEndDistance = -windowHeight * 0.2;

			if (demoCardTop <= fadeStartDistance) {
				if (demoCardTop <= fadeEndDistance) {
					// Fully faded out
					setOpacity(0);
				} else {
					// Calculate opacity: 1 when demoCardTop = fadeStartDistance, 0 when demoCardTop = fadeEndDistance
					const progress = Math.max(
						0,
						Math.min(
							1,
							(fadeStartDistance - demoCardTop) /
								(fadeStartDistance - fadeEndDistance),
						),
					);
					setOpacity(1 - progress);
				}
			} else {
				setOpacity(1);
			}
		};

		// Small delay to ensure DOM is ready
		const timeoutId = setTimeout(() => {
			window.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll(); // Check initial position
		}, 100);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isMounted]);

	if (!isMounted) {
		return null;
	}

	return (
		<div
			className="absolute inset-0 z-[5] overflow-hidden transition-opacity duration-500"
			style={{
				opacity,
				height: containerHeight ? `${containerHeight}px` : "100%",
			}}
		>
			<LaserFlow
				className="h-full w-full"
				horizontalBeamOffset={0}
				verticalBeamOffset={0.15}
				verticalSizing={12}
				horizontalSizing={0.8}
				color="#A855F7"
				flowSpeed={0.35}
				fogIntensity={0.4}
			/>
		</div>
	);
}
