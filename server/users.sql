CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"image_url" varchar,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"resident_alum" varchar NOT NULL,
	"cohort_location" varchar NOT NULL,
	"city" varchar NOT NULL,
	"employed" boolean NOT NULL,
	"employer" varchar NOT NULL,
	"salary" bigint NOT NULL,
	"cohort_num" integer NOT NULL,
  "linkedin" varchar NOT NULL,
  "verification" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.verification (
	"code" varchar NOT NULL
) WITH (
	OIDS=FALSE
);
