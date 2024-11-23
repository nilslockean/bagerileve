import { FientaResponseSchema } from "./schemas/FientaResponseSchema";
import { type Courses } from "@lib/schemas/CoursesSchema.js";
import { prettyCourseDates } from "./stringUtils.ts";
import type { EventScope } from "./schemas/EventScope.ts";
import type { Course } from "./schemas/CourseSchema.ts";

export async function fetchCourses(
  scope: EventScope = "upcoming",
  apiKey: string
): Promise<Courses> {
  const fienta = new URL("https://fienta.com/api/v1/events");
  fienta.searchParams.set("organizer", "11554");

  if (scope === "all" || scope === "past") {
    fienta.searchParams.set("starts_from", "1970-01-01 01:00:00");
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${apiKey}`);

  const response = await fetch(fienta, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  const result = FientaResponseSchema.parse(data);

  if ("errors" in result) {
    return {
      status: "error",
      message: result.errors[0].user_message,
    };
  }

  const now = new Date(result.time.full_datetime).getTime();

  const courses = result.data
    .filter((course) => {
      // Display previews in development and staging
      if (!course.is_published && import.meta.env.PROD) {
        return false;
      }

      // Never display private courses
      if (!course.is_public) {
        return false;
      }

      if (scope !== "past") {
        return true;
      }

      const starts = new Date(course.starts_at).getTime();
      return starts < now;
    })
    .map((course) => {
      const { title, description } = course.translations.sv;
      const dates = prettyCourseDates(
        new Date(course.starts_at),
        new Date(course.ends_at)
      );
      const year = new Date(course.starts_at).getFullYear();

      return {
        slug: course.id.toString(),
        url: course.url,
        draft: !course.is_published,
        soldOut: course.sale_status === "soldOut",
        salesEnded: course.sale_status === "salesEnded",
        title,
        description,
        // starts_at: course.starts_at,
        // ends_at: course.ends_at,
        dates,
        year,
        image: course.image_url,
      } satisfies Course;
    });

  return {
    status: "success",
    courses,
  };
}
