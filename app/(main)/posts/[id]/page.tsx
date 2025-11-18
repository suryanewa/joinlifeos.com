import ContentEditor from "@/components/content/content-editor";
import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import getDbConnection from "@/lib/db";

export default async function PostsPage({
	params: { id },
}: {
	params: { id: string };
}) {
	// Authentication removed

	const sql = await getDbConnection();

	const posts: any = await sql`SELECT * from posts where id = ${id}`;

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<ContentEditor posts={posts} />
			</AnimationContainer>
		</MaxWidthWrapper>
	);
}
