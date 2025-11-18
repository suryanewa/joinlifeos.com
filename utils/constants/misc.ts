import { ChartLine as ChartLineIcon } from "@/components/animate-ui/icons/chart-line";
import { Sparkles as SparklesIcon } from "@/components/animate-ui/icons/sparkles";
import { Unplug as UnplugIcon } from "@/components/animate-ui/icons/unplug";

export const DEFAULT_AVATAR_URL =
	"https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
	{
		name: "School 1",
		logo: "/assets/school-01.svg",
		color: "#4f2987", // Purple
	},
	{
		name: "School 2",
		logo: "/assets/school-02.svg",
		color: "#2774ae", // Blue
	},
	{
		name: "School 3",
		logo: "/assets/school-03.svg",
		color: "#A41F35", // Red
	},
	{
		name: "School 4",
		logo: "/assets/school-04.svg",
		color: "#4f2984", // Purple
	},
	{
		name: "School 5",
		logo: "/assets/school-05.svg",
		color: "#1a73e8", // Blue (default, adjust if needed)
	},
	{
		name: "School 6",
		logo: "/assets/school-06.svg",
		color: "#ea4335", // Red (default, adjust if needed)
	},
	{
		name: "School 7",
		logo: "/assets/school-07.svg",
		color: "#34a853", // Green (default, adjust if needed)
	},
	{
		name: "School 8",
		logo: "/assets/school-08.svg",
		color: "#fbbc04", // Yellow (default, adjust if needed)
	},
] as const;

export const PROCESS = [
	{
		title: "Connect Your Systems",
		description:
			"One-click imports from Gmail, Canvas, calendars, banking apps, and more. Zero-setup onboarding gets you started in minutes.",
		icon: UnplugIcon,
	},
	{
		title: "Organize Everything",
		description:
			"LifeOS automatically prioritizes tasks, schedules your time, and converts messages into actionable items.",
		icon: SparklesIcon,
	},
	{
		title: "Control the Chaos",
		description:
			"One unified dashboard shows your classes, assignments, finances, and goals. Your life, organized.",
		icon: ChartLineIcon,
	},
] as const;

export const FEATURES = [
	{
		title: "Link shortening",
		description: "Create short links that are easy to remember and share.",
	},
	{
		title: "Advanced analytics",
		description: "Track and measure the performance of your links.",
	},
	{
		title: "Password protection",
		description: "Secure your links with a password.",
	},
	{
		title: "Custom QR codes",
		description: "Generate custom QR codes for your links.",
	},
	{
		title: "Link expiration",
		description: "Set an expiration date for your links.",
	},
	{
		title: "Team collaboration",
		description: "Share links with your team and collaborate in real-time.",
	},
] as const;

export const REVIEWS = [
	{
		name: "Michael Smith",
		username: "@michaelsmith",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		rating: 5,
		review:
			"LifeOS changed everything. I used to juggle 15+ apps daily. Now everything is in one place. My stress levels dropped significantly.",
	},
	{
		name: "Emily Johnson",
		username: "@emilyjohnson",
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
		rating: 5,
		review:
			"The AI assistant is incredible. It actually understands my schedule and priorities. No more missed deadlines or forgotten assignments!",
	},
	{
		name: "Daniel Williams",
		username: "@danielwilliams",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
		rating: 5,
		review:
			"Finally, a platform that gets student life. The unified inbox saved me hours every week. Everything from Canvas to Gmail in one view.",
	},
	{
		name: "Sophia Brown",
		username: "@sophiabrown",
		avatar: "https://randomuser.me/api/portraits/women/2.jpg",
		rating: 5,
		review:
			"LifeOS helped me feel in control again. The Life Dashboard shows me exactly what I need to focus on. No more cognitive overload.",
	},
	{
		name: "James Taylor",
		username: "@jamestaylor",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		rating: 5,
		review:
			"Best investment I've made as a student. The automatic task prioritization and calendar sync eliminated so much mental overhead.",
	},
	{
		name: "Olivia Martinez",
		username: "@oliviamartinez",
		avatar: "https://randomuser.me/api/portraits/women/3.jpg",
		rating: 5,
		review:
			"I can't imagine going back to managing everything separately. LifeOS transformed how I organize my academic and personal life.",
	},
	{
		name: "William Garcia",
		username: "@williamgarcia",
		avatar: "https://randomuser.me/api/portraits/men/4.jpg",
		rating: 5,
		review:
			"The screenshot intelligence feature is a game-changer. I snap a photo of a flyer and it becomes a task automatically. So smart!",
	},
	{
		name: "Mia Rodriguez",
		username: "@miarodriguez",
		avatar: "https://randomuser.me/api/portraits/women/4.jpg",
		rating: 5,
		review:
			"LifeOS reduced my digital fatigue by 80%. One platform instead of 20 apps. The gamified habits keep me motivated too.",
	},
	{
		name: "Henry Lee",
		username: "@henrylee",
		avatar: "https://randomuser.me/api/portraits/men/5.jpg",
		rating: 5,
		review:
			"This is the operating system for student life. Everything connected, organized, and automated. My productivity has never been higher.",
	},
] as const;
