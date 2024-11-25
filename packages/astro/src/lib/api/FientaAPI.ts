import { type CoursesResult } from "@lib/schemas/CoursesResult.js";
import { prettyCourseDates } from "@lib/stringUtils.ts";
import type { EventScope } from "@lib/schemas/EventScope.ts";
import type { Course } from "@lib/schemas/Course.ts";
import { FientaAllEventsResponseSchema } from "@lib/schemas/FientaAllEvents.ts";
import type { CourseError, CourseResult } from "@lib/schemas/CourseResult.ts";
import { FientaSingleEventResponseSchema } from "@lib/schemas/FientaSingleEvent.ts";
import type { FientaEventDetails } from "@lib/schemas/FientaEventDetails.ts";
import type { ErrorResponse } from "@lib/schemas/FientaResponseSchema";
import { HttpClient } from "@lib/HttpClient";
import type { IHttpClient } from "@lib/types/IHttpClient";

export class FientaAPI {
  private apiKey: string;
  private isProd: boolean;
  private httpClient = new HttpClient();

  private baseUrl = "https://fienta.com/api/v1";
  private organzerId = "11554";
  private beginning = "1970-01-01 01:00:00";

  constructor(apiKey: string, isProd: boolean, httpClient?: IHttpClient) {
    this.apiKey = apiKey;
    this.isProd = isProd;

    if (httpClient) {
      this.httpClient = httpClient;
    }
  }

  private getURL(path: string): URL {
    const url = new URL(`${this.baseUrl}/${path}`);
    url.searchParams.set("organizer", this.organzerId);
    return url;
  }

  private get headers(): Headers {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.apiKey}`);
    return headers;
  }

  private composeCourse(data: FientaEventDetails): Course {
    const {
      translations: {
        sv: { title, description },
      },
      starts_at,
      ends_at,
      image_url: image,
      id,
      url,
      is_published,
      sale_status,
    } = data;

    const dates = prettyCourseDates(new Date(starts_at), new Date(ends_at));
    const year = new Date(starts_at).getFullYear();
    const slug = id.toString();
    const draft = !is_published;
    const soldOut = sale_status === "soldOut";
    const salesEnded = sale_status === "salesEnded";
    const start = new Date(starts_at);

    return {
      slug,
      url,
      draft,
      soldOut,
      salesEnded,
      title,
      description,
      start,
      dates,
      year,
      image,
    };
  }

  private composeErrorResult(response: ErrorResponse): CourseError {
    return {
      status: "error",
      message: response.errors[0].user_message,
    };
  }

  async getCourse(id: number): Promise<CourseResult> {
    const url = this.getURL(`/events/${id}`);
    const json = await this.httpClient.get(url, {
      headers: this.headers,
    });
    const result = FientaSingleEventResponseSchema.parse(json);

    if ("errors" in result) {
      return this.composeErrorResult(result);
    }

    return {
      status: "success",
      course: this.composeCourse(result.data),
    };
  }

  async getCourses(scope: EventScope = "upcoming"): Promise<CoursesResult> {
    const url = this.getURL("/events");
    if (scope === "all" || scope === "past") {
      url.searchParams.set("starts_from", this.beginning);
    }

    const json = await this.httpClient.get(url, {
      headers: this.headers,
    });
    const result = FientaAllEventsResponseSchema.parse(json);

    if ("errors" in result) {
      return this.composeErrorResult(result);
    }

    const now = new Date(result.time.full_datetime).getTime();
    return {
      status: "success",
      courses: result.data
        .filter((course) => this.filterCourse(course, scope, now))
        .map(this.composeCourse),
    };
  }

  private filterCourse(
    course: FientaEventDetails,
    scope: EventScope,
    now: number
  ): boolean {
    // Display previews in development and staging
    if (!course.is_published && this.isProd) {
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
  }
}
