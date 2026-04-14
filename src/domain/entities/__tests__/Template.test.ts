import { describe, it, expect } from "vitest";
import { Template } from "../Template";

describe("Template", () => {
  const rawTemplate = {
    id: "uuid-1",
    slug: "test-template",
    category: "business",
    displayNameKey: "templates.test.name",
    descriptionKey: "templates.test.description",
    fields: [
      {
        name: "field1",
        label: "Field 1",
        type: "text",
        defaultValue: "",
        placeholder: null,
        options: [],
        dateMode: null,
        isDisabled: false,
        isAuto: false,
      },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  it("should create a Template instance from raw data", () => {
    const template = Template.fromRaw(rawTemplate);

    expect(template).toBeInstanceOf(Template);
    expect(template.id).toBe("uuid-1");
    expect(template.slug).toBe("test-template");
    expect(template.category).toBe("business");
    expect(template.displayNameKey).toBe("templates.test.name");
    expect(template.descriptionKey).toBe("templates.test.description");
    expect(template.fields).toEqual(rawTemplate.fields);
    expect(template.createdAt).toBe(rawTemplate.createdAt);
    expect(template.updatedAt).toBe(rawTemplate.updatedAt);
  });
});
