import {
  getUser as _getUser,
  ensureAuthCookie,
  getAuthCookie,
} from "@/app/utils/api";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUser = cache(async () => {
  const cookie = await getAuthCookie();
  const user = cookie === null ? null : await getUserCore(cookie);
  return user ?? null;
});

export const ensureUser = cache(async () => {
  const user = await getUserCore(await ensureAuthCookie());
  if (user === undefined) redirect("/signin");
  return user;
});

const getUserCore = cache(async (cookie: string) => {
  return (await _getUser({ cookie })).json;
});
