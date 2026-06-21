import { getUser as _getUser, getAuthCookie } from "@/app/utils/api";
import { cache } from "react";

export const getUser = cache(async () => {
  const cookie = await getAuthCookie();
  const user = cookie === null ? null : await _getUser({ cookie });
  return user;
});
