import { z } from "zod";
import { categories } from "./categories";

export const occasionOptions = [
  ...categories.map((c) => c.title),
  "Wedding",
  "Other",
];

export const sessionOptions = [
  "Essential · 1 – 2 hr",
  "Signature · 3 – 4 hr",
  "Archive · 5 – 6 hr",
  "Full-day (wedding / arangetram)",
  "Not sure yet",
];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  occasion: z
    .string()
    .trim()
    .min(1, "Pick an occasion.")
    .refine((v) => occasionOptions.includes(v), "Pick an occasion from the list."),
  session: z
    .string()
    .trim()
    .min(1, "Pick a session length.")
    .refine((v) => sessionOptions.includes(v), "Pick a session from the list."),
  date: z.string().trim().min(1, "Add a preferred date.").max(40),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps us prepare.")
    .max(2000),
  // Honeypot — real users never fill this; a value is silently dropped server-side.
  company: z.string().optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
