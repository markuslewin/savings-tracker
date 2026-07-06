"use server";

import { createGoal as _createGoal, ensureAuthCookie } from "@/app/utils/api";
import { FormAction } from "@/app/utils/form";
import { goalSchema } from "@/app/utils/schema";
import { redirect } from "next/navigation";
import * as z from "zod";

export const createGoal: FormAction<"name" | "target"> = async (
  _,
  formData,
) => {
  const values = Object.fromEntries(formData) as Record<string, string>;
  const parsed = goalSchema.safeParse(values);
  if (!parsed.success)
    return {
      values,
      errors: z.flattenError(parsed.error).fieldErrors,
    };

  const response = await _createGoal({
    cookie: await ensureAuthCookie(),
    data: parsed.data,
  });
  switch (response.status) {
    case 201:
      redirect(`/goals/${encodeURIComponent(response.json.id)}`, "replace");
    case 400:
      return { values, errors: response.json.errors };
    case 401:
      redirect("/signin");
  }
};
