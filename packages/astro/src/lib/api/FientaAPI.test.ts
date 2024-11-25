import type { IHttpClient } from "@lib/types/IHttpClient";
import { FientaAPI } from "./FientaAPI";
import { test, describe, beforeEach } from "vitest";
import { expect } from "vitest";

const exampleCourse = {
  id: 96677,
  starts_at: "2024-08-31T16:30:00+03:00",
  ends_at: "2024-09-01T16:00:00+03:00",
  sale_status: "soldOut",
  is_published: true,
  is_public: true,
  url: "https://example.com",
  buy_tickets_url: "https://example.com",
  image_url: "https://example.com/image.jpg",
  translations: {
    sv: {
      title: "Test",
      description: "Test description",
      duration_string: "7h",
      notes_about_time: null,
    },
  },
};

class MockHttpClient implements IHttpClient {
  public returnData: unknown = {};

  public async get(): Promise<unknown> {
    return await this.request();
  }

  public async request(): Promise<unknown> {
    return this.returnData;
  }
}
const httpClient = new MockHttpClient();
const api = new FientaAPI("FIENTA_DATA_IS_MOCKED", false, httpClient);

beforeEach(() => {
  httpClient.returnData = {};
});

describe("FientaAPI", () => {
  test("should return error and message if API returns error", async () => {
    httpClient.returnData = {
      errors: [
        {
          code: 401,
          user_message: "Unauthorized access",
          internal_message: "authorization_failed",
        },
      ],
    };

    const result = await api.getCourses();
    expect(result).toEqual({
      status: "error",
      message: "Unauthorized access",
    });
  });

  test("should return compose single course", async () => {
    httpClient.returnData = {
      success: {
        code: 200,
      },
      time: {
        timestamp: 1732529288,
        full_datetime: "2024-11-25T12:08:08+02:00",
        timezone: "Europe/Tallinn",
      },
      data: exampleCourse,
    };

    const result = await api.getCourse(12345);
    expect(result).toEqual({
      status: "success",
      course: {
        slug: "96677",
        url: "https://example.com",
        draft: false,
        soldOut: true,
        salesEnded: false,
        title: "Test",
        description: "Test description",
        start: new Date("2024-08-31T13:30:00.000Z"),
        dates: "Lördag 31 augusti - söndag 1 september 2024",
        year: 2024,
        image: "https://example.com/image.jpg",
      },
    });
  });

  test("should get list of courses", async () => {
    httpClient.returnData = {
      success: {
        code: 200,
        user_message: "Events returned successfully",
        internal_message: "events_returned_successfully",
      },
      time: {
        timestamp: 1732530689,
        date: "2024-11-25",
        time: "12:31:29",
        full_datetime: "2024-11-25T12:31:29+02:00",
        timezone: "Europe/Tallinn",
        timezone_short: "EET",
        gmt: "+0200",
      },
      data: [exampleCourse, exampleCourse],
    };

    const result = await api.getCourses();
    expect(result.status).toBe("success");
    expect(result).toHaveProperty("courses");
    // @ts-ignore
    expect(result.courses.length).toBe(2);
  });
});
