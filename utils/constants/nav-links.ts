import {
	ActivityIcon,
	BrainIcon,
	CameraIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
	MapPinIcon,
	NewspaperIcon,
	RefreshCwIcon,
} from "lucide-react";

export const NAV_LINKS = [
	{
		title: "Product",
		href: "/product",
		menu: [
			{
				title: "Life Capture",
				tagline: "Capture and organize your life moments.",
				href: "/product/life-capture",
				icon: CameraIcon,
			},
			{
				title: "Life Sync",
				tagline: "Sync all your apps and services.",
				href: "/product/life-sync",
				icon: RefreshCwIcon,
			},
			{
				title: "Life Map",
				tagline: "Visualize and navigate your life journey.",
				href: "/product/life-map",
				icon: MapPinIcon,
			},
			{
				title: "Life Mind",
				tagline: "AI-powered life intelligence.",
				href: "/product/life-mind",
				icon: BrainIcon,
			},
			{
				title: "Life Stage",
				tagline: "Track your life stages and milestones.",
				href: "/product/life-stage",
				icon: LayoutDashboardIcon,
			},
			{
				title: "Life Track",
				tagline: "Monitor and track your life metrics.",
				href: "/product/life-track",
				icon: ActivityIcon,
			},
		],
	},
	{
		title: "Pricing",
		href: "/pricing",
	},
	{
		title: "Company",
		href: "/company",
	},
	{
		title: "Resources",
		href: "/resources",
		menu: [
			{
				title: "Blog",
				tagline: "Read articles on the latest trends in tech.",
				href: "/resources/blog",
				icon: NewspaperIcon,
			},
			{
				title: "Help",
				tagline: "Get answers to your questions.",
				href: "/resources/help",
				icon: HelpCircleIcon,
			},
		],
	},
	{
		title: "Roadmap",
		href: "/roadmap",
	},
];
