// schemaTypes/contactType.ts
import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
defineField({
  name: "email",
  title: "Email Address",
  type: "string",
  validation: (Rule) =>
    Rule.required().regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      {
        name: "email",
        invert: false,
      }
    ).error("Please enter a valid email address."),
}),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Message from ${title}`,
        subtitle,
      };
    },
  },
});
