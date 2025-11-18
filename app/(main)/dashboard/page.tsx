import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import UploadForm from "@/components/upload/upload-form";

// Ensure server actions on this route have sufficient time on Vercel
export const runtime = "nodejs";
export const maxDuration = 60; // Allow up to 60s (Vercel Pro)

export default async function Dashboard() {
	// Authentication removed - all users can access
	const planTypeName = "Starter";

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
					<UploadForm planTypeName={planTypeName} />
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
}
