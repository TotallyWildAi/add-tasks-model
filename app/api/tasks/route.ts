// Route Handlers for /api/tasks.
// GET  → returns tasks ordered with open (done=false) first, newest within group.
// POST → validates {title} via Zod, creates a Task, returns 201 (or 400 on bad input).
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const tasks = await prisma.task.findMany({
    orderBy: [{ done: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  try {
    const { title } = createTaskSchema.parse(raw);
    const task = await prisma.task.create({ data: { title } });
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "validation failed", issues: err.issues },
        { status: 400 },
      );
    }
    throw err;
  }
}
