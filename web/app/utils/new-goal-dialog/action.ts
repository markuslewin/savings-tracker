"use server";

import { schema } from "@/app/utils/new-goal-dialog/schema";
import { redirect } from "next/navigation";
import * as z from "zod";

export const createGoal = async (prevState: unknown, formData: FormData) => {
  const values = Object.fromEntries(formData);
  const result = schema.safeParse(values);
  if (!result.success) {
    return {
      values: { name: values.name, target: values.target },
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  console.log("Create new goal", { result });
  // todo: /goal/${goal.id}
  redirect("/");
};
