"use client";

import { AnimationContainer } from "@/components/global";
import MagicCard from "@/components/ui/magic-card";
import { PROCESS } from "@/utils";
import { useState } from "react";

export function ProcessCards() {
	return (
		<div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
			{PROCESS.map((process, id) => (
				<ProcessCard key={id} process={process} id={id} />
			))}
		</div>
	);
}

function ProcessCard({
	process,
	id,
}: {
	process: (typeof PROCESS)[number];
	id: number;
}) {
	const [isHovered, setIsHovered] = useState(false);
	const IconComponent = process.icon;

	return (
		<AnimationContainer delay={0.2 * id}>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<MagicCard className="group md:py-8">
					<div className="flex w-full flex-col items-start justify-center">
						<IconComponent
							size={40}
							animate={isHovered}
							className="h-10 w-10 text-foreground"
						/>
						<div className="relative flex flex-col items-start">
							<span className="-top-6 absolute right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border pt-0.5 font-medium text-2xl text-foreground">
								{id + 1}
							</span>
							<h3 className="mt-6 font-medium text-base text-foreground">
								{process.title}
							</h3>
							<p className="mt-2 text-muted-foreground text-sm">
								{process.description}
							</p>
						</div>
					</div>
				</MagicCard>
			</div>
		</AnimationContainer>
	);
}
