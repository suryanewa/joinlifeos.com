import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	videoOrAudioUploader: f({
		video: { maxFileSize: "32MB" },
		audio: { maxFileSize: "32MB" },
	})
		.middleware(async ({ req }) => {
			// Authentication removed - all users can upload
			const userId = "anonymous";

			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);

			console.log("file url", file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { userId: metadata.userId, file };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
