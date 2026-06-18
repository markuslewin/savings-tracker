import { cache } from "react";

export const getNow = cache(() => new Date());
