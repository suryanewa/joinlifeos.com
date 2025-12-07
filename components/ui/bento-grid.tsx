import { StarsBackground } from "@/components/ui/bg-stars";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command } from "@/components/ui/command";
import { cn } from "@/utils";
import {
	ArrowRightIcon,
	CalendarIcon,
	Link2Icon,
	SearchIcon,
	WaypointsIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./card";
import { Input } from "./input";
import { Integrations } from "./integrations";
import { Label } from "./label";

export const CARDS = [
	{
		Icon: Link2Icon,
		name: "Unified Inbox",
		description:
			"Centralize all communications, auto-tag, and convert to tasks in one place.",
		href: "#",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-1",
		background: (
			<Card className="absolute top-10 left-10 z-10 origin-top rounded-none rounded-tl-md border border-border border-r-0 bg-neutral-950 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105">
				<CardHeader>
					<CardTitle>Unified Inbox</CardTitle>
					<CardDescription>
						Gmail, Outlook, Slack — all in one place.
					</CardDescription>
				</CardHeader>
				<CardContent className="-mt-4">
					<Label>Your messages</Label>
					<Input
						type="text"
						placeholder="Search across all platforms..."
						className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
					/>
				</CardContent>
			</Card>
		),
	},
	{
		Icon: SearchIcon,
		name: "AI Life Assistant",
		description:
			"Proactive, contextual agent that understands your schedule and priorities.",
		href: "#",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-2",
		background: (
			<Command className="group-hover:-translate-x-10 absolute top-10 right-10 z-10 w-[70%] origin-to translate-x-0 border border-border bg-neutral-950 p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
				<Input placeholder="What's on my plate today?" />
				<div className="mt-1 cursor-pointer">
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						📅 3 classes today, 2 assignments due
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						💰 Rent payment due in 2 days
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						📧 5 unread messages from professors
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						🎯 Study session scheduled for tonight
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						⚡ Focus mode: 2 hours available
					</div>
					<div className="rounded-md px-4 py-2 hover:bg-muted">
						📊 Weekly progress: 85% goals met
					</div>
				</div>
			</Command>
		),
	},
	{
		Icon: WaypointsIcon,
		name: "Life Sync",
		description:
			"Connect Gmail, Canvas, banking, and social apps with API-first sync.",
		href: "#",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
		background: (
			<Integrations className="absolute top-4 right-2 h-[300px] w-[600px] border-none pl-28 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 md:pl-0" />
		),
	},
	{
		Icon: CalendarIcon,
		name: "Life Dashboard",
		description:
			"Interactive planner combining calendar, tasks, notes, and wellness.",
		className: "col-span-3 lg:col-span-1",
		href: "#",
		cta: "Learn more",
		background: (
			<Calendar
				mode="single"
				selected={new Date(2022, 4, 11, 0, 0, 0)}
				className="absolute top-10 right-0 z-10 origin-top rounded-md border border-border bg-neutral-950 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
			/>
		),
	},
];

const BentoGrid = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
				className,
			)}
		>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
}: {
	name: string;
	className: string;
	background: ReactNode;
	Icon: any;
	description: string;
	href: string;
	cta: string;
}) => (
	<div
		key={name}
		className={cn(
			"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-border/60",
			"bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			className,
		)}
	>
		<StarsBackground
			className="absolute inset-0 z-0 h-full w-full"
			disableScrollFade
		/>
		<div>{background}</div>
		<div className="group-hover:-translate-y-10 pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300">
			<Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
			<h3 className="font-semibold text-neutral-300 text-xl">{name}</h3>
			<p className="max-w-lg text-neutral-400">{description}</p>
		</div>

		<div
			className={cn(
				"absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
			)}
		>
			<Link
				href={href}
				className={buttonVariants({
					size: "sm",
					variant: "ghost",
					className: "cursor-pointer",
				})}
			>
				{cta}
				<ArrowRightIcon className="ml-2 h-4 w-4" />
			</Link>
		</div>
		<div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</div>
);

export { BentoCard, BentoGrid };
