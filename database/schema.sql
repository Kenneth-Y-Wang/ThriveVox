set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"userLocation" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	"updatedAt" timestamptz(6) not null default now(),
	"avaterUrl" TEXT,
	"avaterCaption" TEXT,
	"userStyle" TEXT,
	"userSkills" TEXT,
	"userInstruments" TEXT,
	"userPrimaryInterest" TEXT,
	"userInterest" TEXT,
	"userBand" TEXT,
	"userBio" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"userId" integer NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	"content" TIME NOT NULL,
	"updatedAt" timestamptz(6) not null default now(),
	"postId" integer NOT NULL,
	"favoriteId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likedFavorite" (
	"userId" integer NOT NULL,
	"favoriteId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."posts" (
	"postId" serial NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"captain" TEXT,
	"createdAt" timestamptz(6) not null default now(),
	"location" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"audioUrl" TEXT NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likedPosts" (
	"userId" integer NOT NULL,
	"postId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."savedFavorite" (
	"userId" integer NOT NULL,
	"favoriteId" serial NOT NULL,
	"favoriteType" TEXT NOT NULL,
	"favoriteDetails" json NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "savedFavorite_pk" PRIMARY KEY ("favoriteId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk2" FOREIGN KEY ("favoriteId") REFERENCES "savedFavorite"("favoriteId");

ALTER TABLE "likedFavorite" ADD CONSTRAINT "likedFavorite_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likedFavorite" ADD CONSTRAINT "likedFavorite_fk1" FOREIGN KEY ("favoriteId") REFERENCES "savedFavorite"("favoriteId");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "likedPosts" ADD CONSTRAINT "likedPosts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likedPosts" ADD CONSTRAINT "likedPosts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "savedFavorite" ADD CONSTRAINT "savedFavorite_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
