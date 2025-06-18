import { POST, GET } from "@/app/(client)/api/contact/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, options?: { status?: number }) => {
      return {
        status: options?.status || 200,
        json: async () => data,
      };
    },
  },
}));

jest.mock("@sanity/client", () => ({
  createClient: () => ({
    fetch: jest.fn().mockResolvedValue([
      { _id: "1", name: "Test", email: "test@test.com", message: "Hi" },
    ]),
    create: jest.fn().mockResolvedValue({
      _id: "1", name: "Altina", email: "altina@example.com", message: "Test",
    }),
  }),
}));

describe("Contact API Route", () => {
  it("POST - kthen 400 nëse mungon ndonjë fushë", async () => {
    const req = {
      json: async () => ({ name: "Altina", email: "" }),
    } as unknown as Request;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("All fields are required.");
  });

  it("POST - kthen 200 nëse të gjitha fushat janë të plota", async () => {
    const req = {
      json: async () => ({
        name: "Altina",
        email: "altina@example.com",
        message: "Test",
      }),
    } as unknown as Request;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
  });

  it("GET - duhet të kthejë status 200", async () => {
    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.contacts).toBeDefined();
  });
});
