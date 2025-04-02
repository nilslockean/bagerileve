import { test, describe, beforeEach } from "vitest";
import { expect } from "vitest";
import type { ISanityClient } from "@lib/types/ISanityClient";
import { SanityAPI } from "./SanityAPI";

class MockSanityClient implements ISanityClient {
  public returnData: unknown = {};

  public async fetch(): Promise<unknown> {
    return this.returnData;
  }
}
const sanityClient = new MockSanityClient();
const api = new SanityAPI(sanityClient, "12345", "test");

beforeEach(() => {
  sanityClient.returnData = {};
  api.now = undefined;
});

describe("SanityAPI", () => {
  test("should return asset URL", async () => {
    const result = api.getAsset("test.jpg");
    expect(result).toEqual("https://cdn.sanity.io/files/12345/test/test.jpg");
  });

  test("should return order terms as is", async () => {
    sanityClient.returnData = [
      {
        title: "Term 1",
        content: [],
        sortOrder: 0,
      },
      { title: "Term 2", content: [], sortOrder: 10 },
    ];

    const result = await api.getOrderTerms();
    expect(result).toStrictEqual(sanityClient.returnData);
  });

  test("should return faq as is", async () => {
    sanityClient.returnData = [
      { question: "Q1", answer: [] },
      { question: "Q2", answer: [] },
    ];

    const result = await api.getFaq();
    expect(result).toStrictEqual(sanityClient.returnData);
  });

  test("should filter out irregular opening hours in the past", async () => {
    const title = "Test";
    const hours = [
      { day: "tisdag - fredag", time: "11-18" },
      { day: "lördag", time: "9-16" },
      { day: "söndag - måndag", closed: true },
    ];
    const irregular = [
      { date: "2022-02-01", time: "10-15" },
      { date: "2022-12-31", time: "10-15" },
      { date: "2023-12-24", closed: true },
      { date: "2023-12-25", time: "10-15" },
    ];

    // Should include today's date
    api.now = new Date("2023-12-24 14:45:26");
    sanityClient.returnData = [
      {
        title,
        hours,
        irregular,
      },
    ];

    const result = await api.getOpeningHours();
    expect(result.title).toEqual(title);
    expect(result.hours).toStrictEqual([
      { day: "tisdag - fredag", time: "11-18" },
      { day: "lördag", time: "9-16" },
      { day: "söndag - måndag", closed: true },
    ]);
    expect(result.irregular?.length).toBe(2);
    expect(result.irregular![0].date).toEqual("2023-12-24");
    expect(result.irregular![1].date).toEqual("2023-12-25");
  });

  test("should format format irregular dates correctly", async () => {
    const title = "Test";
    const hours = [{ day: "tisdag - fredag", time: "11-18" }];
    const irregular = [{ date: "2022-02-01", time: "10-15" }];

    api.now = new Date("2021-01-01");
    sanityClient.returnData = [
      {
        title,
        hours,
        irregular,
      },
    ];

    const result = await api.getOpeningHours();
    expect(result.irregular![0].date).toEqual("2022-02-01");
    expect(result.irregular![0].formattedDate).toEqual(
      "Tisdag 1 februari 2022"
    );
  });
});
