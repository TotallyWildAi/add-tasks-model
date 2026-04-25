// Server Component: queries Prisma directly at request time and renders
// the open tasks list as HTML. No client JS needed for the initial render.
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    where: { done: false },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main>
      <h1>Open Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      {tasks.length === 0 ? (
        <p>No open tasks. POST to /api/tasks to add one.</p>
      ) : null}
    </main>
  );
}
