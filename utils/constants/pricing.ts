export const ORIGIN_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: `${process.env.PRODUCTION_ORIGIN_URL}`;

export const PLANS = [
	{
		id: "free",
		name: "Free",
		info: "Core features for students",
		price: {
			monthly: 0,
			yearly: 0,
		},
		features: [
			{ text: "Unified Inbox" },
			{ text: "Basic task management" },
			{ text: "Calendar integration" },
			{ text: "Life Dashboard" },
			{
				text: "Community support",
				tooltip: "Get answers to your questions on our community forum",
			},
			{
				text: "Limited AI features",
				tooltip: "Basic AI assistant with limited queries",
			},
		],
		btn: {
			text: "Get started for free",
			href: "/sign-in",
			variant: "default",
		},
	},
	{
		id: "premium",
		name: "Premium",
		info: "Unlimited integrations and AI",
		price: {
			monthly: 10,
			yearly: Math.round(10 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: "Unlimited integrations" },
			{ text: "Advanced AI Life Assistant" },
			{ text: "Screenshot Intelligence" },
			{ text: "Intelligent Automations" },
			{ text: "Gamified Habits & Goals" },
			{ text: "Life Graph (semantic second brain)" },
			{ text: "Priority support", tooltip: "Get 24/7 chat support" },
			{
				text: "Advanced analytics",
				tooltip: "Track your productivity and well-being insights",
			},
		],
		btn: {
			text: "Get started",
			href: "/sign-in",
			variant: "purple",
		},
		priceId: process.env.STRIPE_PRICE_ID_PRO_PLAN,
	},
];

export const PRICING_FEATURES = [
	{
		text: "Shorten links",
		tooltip: "Create shortened links",
	},
	{
		text: "Track clicks",
		tooltip: "Track clicks on your links",
	},
	{
		text: "See top countries",
		tooltip: "See top countries where your links are clicked",
	},
	{
		text: "Upto 10 tags",
		tooltip: "Add upto 10 tags to your links",
	},
	{
		text: "Community support",
		tooltip: "Community support is available for free users",
	},
	{
		text: "Priority support",
		tooltip: "Get priority support from our team",
	},
	{
		text: "AI powered suggestions",
		tooltip: "Get AI powered suggestions for your links",
	},
];

export const WORKSPACE_LIMIT = 2;
