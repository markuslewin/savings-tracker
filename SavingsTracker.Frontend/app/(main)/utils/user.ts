import {
  getUser as _getUser,
  ensureAuthCookie,
  getAuthCookie,
} from "@/app/utils/api";
import { cache } from "react";

export const getUser = cache(async () => {
  const cookie = await getAuthCookie();
  const user = cookie === null ? null : await getUserCore(cookie);
  return user;
});

export const ensureUser = cache(async () => {
  return getUserCore(await ensureAuthCookie());
});

const getUserCore = cache(async (cookie: string) => {
  return _getUser({ cookie });
});
