"use server";

import * as z from "zod";

export const createGoal = async (formData: FormData) => {
  const goal = z
    .object({
      name: z.string(),
      target: z.coerce.number(),
      deadline: z.coerce.date().optional(),
    })
    .parse(Object.fromEntries(formData));

  console.log("Create new goal", { goal });
};
