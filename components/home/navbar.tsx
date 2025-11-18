"use client";
import MobileNavbar from "@/components/home/mobile-navbar";
import { buttonVariants } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAV_LINKS, cn } from "@/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import AnimationContainer from "../global/animation-container";
import MaxWidthWrapper from "../global/max-width-wrapper";

const Navbar = () => {
	const pathname = usePathname();

	const [scroll, setScroll] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 8) {
			setScroll(true);
		} else {
			setScroll(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={cn(
				"sticky inset-x-0 top-0 z-[99999] h-14 w-full select-none border-transparent border-b",
				scroll && "border-background/80 bg-background/40 backdrop-blur-md",
			)}
		>
			<AnimationContainer reverse delay={0.1} className="size-full">
				<MaxWidthWrapper className="relative flex items-center justify-between">
					<Link href="/" className="flex items-center">
						<Image
							src="/assets/LifeOS Lockup.svg"
							alt="LifeOS"
							width={360}
							height={96}
							className="h-24 w-auto"
						/>
					</Link>

					<NavigationMenu className="-translate-x-1/2 absolute left-1/2 hidden transform lg:flex">
						<NavigationMenuList>
							{NAV_LINKS.map((link) => (
								<NavigationMenuItem key={link.title}>
									{link.menu ? (
										<>
											<NavigationMenuTrigger>
												{link.title}
											</NavigationMenuTrigger>
											<NavigationMenuContent>
												<ul
													className={cn(
														"grid gap-1 rounded-xl p-4 md:w-[400px] lg:w-[500px]",
														"lg:grid-cols-2",
													)}
												>
													{link.menu.map((menuItem) => (
														<ListItem
															key={menuItem.title}
															title={menuItem.title}
															href={menuItem.href}
															icon={menuItem.icon}
														>
															{menuItem.tagline}
														</ListItem>
													))}
												</ul>
											</NavigationMenuContent>
										</>
									) : (
										<NavigationMenuLink
											href={link.href}
											className={navigationMenuTriggerStyle()}
										>
											{link.title}
										</NavigationMenuLink>
									)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>

					<div className="hidden items-center lg:flex">
						<div className="flex items-center gap-x-4">
							<Link
								href="/dashboard"
								className={buttonVariants({ size: "sm" })}
							>
								Get Started
							</Link>
						</div>
					</div>
					<MobileNavbar />
				</MaxWidthWrapper>
			</AnimationContainer>
		</header>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href!}
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="flex items-center space-x-2 text-neutral-300">
						<Icon className="h-4 w-4" />
						<h6 className="!leading-none font-medium text-sm">{title}</h6>
					</div>
					<p
						title={children! as string}
						className="line-clamp-1 text-muted-foreground text-sm leading-snug"
					>
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

export default Navbar;
