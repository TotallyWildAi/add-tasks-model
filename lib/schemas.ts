// Zod schemas — single source of truth for request body validation.
// Reused by route handlers and tests so the contract is asserted in one place.
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "title must be a non-empty string"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
