"use server";

import { redirect } from "next/navigation";
import * as z from "zod";

export const createGoal = async (prevState: unknown, formData: FormData) => {
  const values = Object.fromEntries(formData);
  const result = z
    .object({
      name: z.preprocess((val) => {
        return val ? val : undefined;
      }, z.string()),
      target: z.preprocess((val) => {
        return val ? val : undefined;
      }, z.coerce.number()),
      // deadline: z.coerce.date().optional(),
    })
    .safeParse(values);
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
