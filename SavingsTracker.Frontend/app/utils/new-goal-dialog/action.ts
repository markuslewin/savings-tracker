"use server";

import { createGoal as _createGoal, getAuthCookie } from "@/app/utils/api";
import { schema } from "@/app/utils/new-goal-dialog/schema";
import { redirect } from "next/navigation";
import * as z from "zod";

export const createGoal = async (prevState: unknown, formData: FormData) => {
  const values = Object.fromEntries(formData);
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return {
      values: { name: values.name, target: values.target },
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const result = await _createGoal({
    cookie: await getAuthCookie(),
    data: parsed.data,
  });
  if (!result.success) {
    // todo: Feedback
    throw result.error;
  }

  redirect(`/goals/${result.data.id}`);
};
