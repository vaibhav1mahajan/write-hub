"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const getColor = (str: string) => {
    const hash = str
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Generate RGB values
    const r = (hash * 37) % 256; // Red (0-255)
    const g = (hash * 59) % 256; // Green (0-255)
    const b = (hash * 83) % 256; // Blue (0-255)

    return `rgba(${r}, ${g}, ${b}, ${1})`;
  };

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? "Anonymous",
    avatar: user?.imageUrl,
    color: getColor(user.fullName ?? "Anonymous"),
  }));

  return users;
}

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getByIds, { ids });
}
