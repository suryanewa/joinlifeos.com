import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { LaserFlowWrapper } from "@/components/home/laser-flow-wrapper";
import { ProcessCards } from "@/components/home/process-cards";
import PricingCards from "@/components/pricing-cards";
import { AnimatedLock } from "@/components/ui/animated-lock";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import { StarsBackground } from "@/components/ui/bg-stars";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import MagicCard from "@/components/ui/magic-card";
import Marquee from "@/components/ui/marquee";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Drive } from "@/components/ui/svgs/drive";
import { Gmail } from "@/components/ui/svgs/gmail";
import { MicrosoftOutlook } from "@/components/ui/svgs/microsoftOutlook";
import { Notion } from "@/components/ui/svgs/notion";
import { OpenaiDark } from "@/components/ui/svgs/openaiDark";
import { Slack } from "@/components/ui/svgs/slack";
import { COMPANIES } from "@/utils";
import { REVIEWS } from "@/utils/constants/misc";
import { ArrowRightIcon, CreditCardIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
	return (
		<div className="scrollbar-hide size-full overflow-x-hidden">
			{/* Hero Section */}
			<div className="relative min-h-screen w-full">
				<StarsBackground className="fixed inset-0 z-[-1] h-screen w-screen" />
				<LaserFlowWrapper />
				<MaxWidthWrapper>
					<div
						id="home"
						className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-t from-background/80 to-transparent text-center"
					>
						<AnimationContainer className="flex w-full flex-col items-center justify-center text-center">
							<button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
								<span>
									<span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
								</span>
								<span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
								<span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/20 blur-md"></span>
								<span className="z-10 flex items-center justify-center gap-1 py-0.5 text-neutral-100 text-sm">
									✨ The Operating System for Your Life
									<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
								</span>
							</button>
							<h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-5xl text-foreground tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
								Control the{" "}
								<span className="inline-bloc bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
									Chaos
								</span>
							</h1>
							<p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
								One platform. Every system. Your life, organized.
								<br className="hidden md:block" />
								<span className="hidden md:block">
									Unify and simplify modern student life with AI-powered life
									management.
								</span>
							</p>
							<div className="z-50 flex items-center justify-center gap-4 whitespace-nowrap">
								<Button asChild>
									<Link href="/dashboard" className="flex items-center">
										Get started for free
										<ArrowRightIcon className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</AnimationContainer>

						<div id="demo-card">
							<AnimationContainer
								delay={0.2}
								className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32"
							>
								<div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 animate-image-glow blur-[5rem] md:top-[10%] md:h-1/3"></div>
								<div className="-m-2 lg:-m-4 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:rounded-2xl">
									<BorderBeam
										size={250}
										duration={12}
										delay={9}
										colorFrom="#c084fc"
										colorTo="#A855F7"
									/>
									<Image
										src="/assets/dashboard-dark.png"
										alt="Dashboard"
										width={1500}
										height={1500}
										quality={100}
										className="rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl"
									/>
									<div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
									<div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
								</div>
							</AnimationContainer>
						</div>
					</div>
				</MaxWidthWrapper>
			</div>

			{/* Companies Section */}
			<MaxWidthWrapper>
				<AnimationContainer delay={0.4}>
					<div id="marquee" className="py-14">
						<div className="mx-auto px-4 md:px-8">
							<h2 className="mb-10 text-center font-heading font-medium text-muted-foreground text-sm">
								Trusted by students at leading universities
							</h2>
							<div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center overflow-hidden px-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
								<div>
									<Marquee className="[--gap:80px]">
										{COMPANIES.map((company) => {
											// Convert hex color to RGB for rgba
											const hex = company.color.replace("#", "");
											const r = parseInt(hex.substring(0, 2), 16);
											const g = parseInt(hex.substring(2, 4), 16);
											const b = parseInt(hex.substring(4, 6), 16);

											// Maximum visibility: Thick white outline + very bright colored glow
											// Using 4 shadows for better visibility while maintaining performance
											const filter = `drop-shadow(0 0 2px rgba(255, 255, 255, 1)) drop-shadow(0 0 4px rgba(255, 255, 255, 1)) drop-shadow(0 0 10px rgba(${r}, ${g}, ${b}, 1)) drop-shadow(0 0 20px rgba(${r}, ${g}, ${b}, 0.8))`;

											return (
												<div
													key={company.name}
													className="flex items-center justify-center"
													style={{
														willChange: "filter",
														transform: "translateZ(0)", // Force GPU acceleration
													}}
												>
													<Image
														src={company.logo}
														alt={company.name}
														width={100}
														height={100}
														quality={100}
														className="h-auto w-24 brightness-125 contrast-110 transition-all hover:scale-105 md:w-28"
														style={{
															filter,
															willChange: "filter",
														}}
													/>
												</div>
											);
										})}
									</Marquee>
								</div>
							</div>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* All Tools in One Place Section */}
			<MaxWidthWrapper className="py-20">
				<AnimationContainer delay={0.1}>
					<div className="flex w-full flex-col items-center justify-center py-8 lg:items-center">
						<MagicBadge title="Integrations" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							All of your tools in one place
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Connect Gmail, Canvas, banking, calendar, and more. Everything you
							need, unified in one intelligent platform.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<div className="relative h-[500px] w-full overflow-hidden rounded-lg border border-border">
						<StarsBackground
							className="absolute inset-0 z-0 h-full w-full"
							disableScrollFade={true}
						/>
						<div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/40 to-black/60" />
						<div className="absolute inset-0 z-10 flex items-center justify-center">
							<div className="size-32 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-3xl" />
						</div>
						<div className="absolute inset-0 z-[15] flex items-center justify-center">
							<div className="size-[360px] rounded-full border border-border bg-transparent" />
						</div>
						<div className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center">
							<div
								className="absolute flex size-32 animate-pulse-glow items-center justify-center rounded-full border-2 border-violet-500/50 bg-background/95 p-6 shadow-2xl backdrop-blur-sm"
								style={{
									boxShadow:
										"0 0 30px rgba(112, 91, 239, 0.8), 0 0 60px rgba(112, 91, 239, 0.5), 0 0 90px rgba(112, 91, 239, 0.3), inset 0 0 20px rgba(112, 91, 239, 0.2)",
								}}
							>
								<Image
									src="/assets/LifeOS Logo.svg"
									alt="LifeOS"
									width={96}
									height={96}
									className="h-full w-full object-contain drop-shadow-lg"
									priority
								/>
							</div>
						</div>
						<div className="absolute inset-0 z-20">
							<OrbitingCircles
								className="size-full"
								radius={180}
								duration={20}
								delay={0}
								iconSize={50}
							>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-3 shadow-lg">
									<Gmail className="size-full" />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-3 shadow-lg">
									<Slack className="size-full" />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-3 shadow-lg">
									<Notion className="size-full" />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-3 shadow-lg">
									<Drive className="size-full" />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-3 shadow-lg">
									<MicrosoftOutlook className="size-full" />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-2 shadow-lg">
									<OpenaiDark className="size-full" />
								</div>
								<div className="flex size-16 items-center justify-center rounded-full border border-border bg-background p-2 shadow-lg">
									<Image
										src="/assets/gemini.svg"
										alt="Gemini"
										width={48}
										height={48}
										className="h-full w-full object-contain"
									/>
								</div>
							</OrbitingCircles>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Features Section */}
			<MaxWidthWrapper className="pt-10">
				<AnimationContainer delay={0.1}>
					<div
						id="features"
						className="flex w-full flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Features" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							One Platform. Every System.
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							LifeOS transforms chaos into clarity, connecting, organizing, and
							automating every aspect of student life into one intelligent
							command center.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<BentoGrid className="py-8">
						{CARDS.map((feature, idx) => (
							<BentoCard key={idx} {...feature} />
						))}
					</BentoGrid>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Encryption Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center py-8 lg:items-center">
						<MagicBadge title="Security" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Encrypted & Protected
						</h2>
						<div className="mt-8 w-full overflow-visible">
							<EvervaultCard
								icon={<AnimatedLock className="h-16 w-16" />}
								className="h-80 w-full border-0"
							/>
						</div>
						<p className="mt-6 max-w-lg text-center text-lg text-muted-foreground">
							LifeOS uses end-to-end encryption to keep your personal
							information and data secure and private.
						</p>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Process Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
						<MagicBadge title="Process" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Organize Your Life
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							LifeOS connects your systems, organizes everything with AI, and
							gives you control over the chaos
						</p>
					</div>
				</AnimationContainer>
				<ProcessCards />
			</MaxWidthWrapper>

			{/* Pricing Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div
						id="pricing"
						className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Simple Pricing" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Choose a Plan
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Start free forever. Upgrade to Premium for unlimited AI features
							and integrations.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<PricingCards />
				</AnimationContainer>
				<AnimationContainer delay={0.3}>
					<div className="mx-auto mt-12 flex w-full max-w-5xl flex-wrap items-start justify-center gap-6 md:items-center lg:justify-evenly">
						<div className="flex items-center gap-2">
							<CreditCardIcon className="h-5 w-5 text-foreground" />
							<span className="text-muted-foreground">
								No credit card required
							</span>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Reviews Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div
						id="testimonials"
						className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Our Customers" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							What our users are saying
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Here&apos;s what some of our users have to say about LifeOS.
						</p>
					</div>
				</AnimationContainer>
				<div className="grid grid-cols-1 place-items-start gap-4 py-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(0, 3).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(3, 6).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(6, 9).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
				</div>
			</MaxWidthWrapper>

			{/* CTA Section */}
			<MaxWidthWrapper className="scrollbar-hide mt-20 max-w-[100vw] overflow-x-hidden">
				<AnimationContainer delay={0.1}>
					<LampContainer>
						<div className="relative flex w-full flex-col items-center justify-center text-center">
							<h2 className="!leading-[1.15] mt-8 bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text py-4 text-center font-heading font-medium text-4xl text-transparent tracking-tight md:text-7xl">
								Your Life, <br />
								Organized
							</h2>
							<p className="mx-auto mt-6 max-w-md text-muted-foreground">
								Stop juggling 15–20 disconnected systems. LifeOS unifies your
								classes, assignments, messages, finances, and goals into one
								intelligent platform.
							</p>
							<div className="mt-6">
								<Button asChild>
									<Link href="/dashboard" className="flex items-center">
										Get started for free
										<ArrowRightIcon className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>
					</LampContainer>
				</AnimationContainer>
			</MaxWidthWrapper>
		</div>
	);
};

export default HomePage;
