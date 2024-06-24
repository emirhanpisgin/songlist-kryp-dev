ALTER TABLE "rating" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "song" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;