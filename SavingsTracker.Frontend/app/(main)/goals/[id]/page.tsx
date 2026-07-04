import { GoalActions } from "@/app/(main)/goals/[id]/components/goal-actions";
import { GoalDetails } from "@/app/(main)/goals/[id]/components/goal-details";
import { getUser } from "@/app/(main)/utils/user";
import { Back } from "@/app/components/back";
import { sprinkles } from "@/app/styles/sprinkles.css";
import {
  addDeposit,
  deleteGoal,
  ensureAuthCookie,
  getAuthCookie,
  getGoal,
  updateGoal,
} from "@/app/utils/api";
import { formatDate } from "@/app/utils/locale";
import { depositSchema, goalSchema } from "@/app/utils/schema";
import { notFound, redirect, unauthorized } from "next/navigation";
import * as z from "zod";

const GoalPage = async ({ params }: PageProps<"/goals/[id]">) => {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(await params);

  const response = await getGoal({
    cookie: await getAuthCookie(),
    data: {
      id,
    },
  });
  switch (response.status) {
    case 401:
      redirect("/signin");
    case 404:
      notFound();
  }

  const user = await getUser();
  const { json: goal } = response;

  return (
    <article
      className={sprinkles({
        stack: "space-0400",
      })}
    >
      <div
        className={sprinkles({
          stack: "space-0125",
        })}
      >
        <header
          className={sprinkles({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "space-0200",
          })}
        >
          <Back to={"/#goals"}>Back</Back>
          <div
            className={sprinkles({
              cluster: "space-0100",
            })}
          >
            <GoalActions
              user={user}
              goal={goal}
              editAction={async (_, formData) => {
                "use server";
                const cookie = await ensureAuthCookie();

                const values = Object.fromEntries(formData) as Record<
                  string,
                  string
                >;
                const parsed = goalSchema.safeParse(values);
                if (!parsed.success)
                  return {
                    values,
                    errors: z.flattenError(parsed.error).fieldErrors,
                  };

                const response = await updateGoal({
                  cookie,
                  data: {
                    ...parsed.data,
                    id: goal.id,
                  },
                });
                switch (response.status) {
                  case 204:
                    redirect(`/goals/${goal.id}`);
                  case 400:
                    return { values, errors: response.json.errors };
                  case 401:
                    redirect("/signin");
                  case 404:
                    redirect("/");
                }
              }}
              deleteAction={async () => {
                "use server";
                const response = await deleteGoal({
                  cookie: await ensureAuthCookie(),
                  data: { id: goal.id },
                });
                switch (response.status) {
                  case 204:
                    redirect("/");
                  case 401:
                    redirect("/signin");
                  case 404:
                    redirect("/");
                }
              }}
            />
          </div>
        </header>
        <h1
          className={sprinkles({
            text: "1",
          })}
        >
          {goal.name}
        </h1>
        <div
          className={sprinkles({
            cluster: "space-0150",
            color: "neutral-300",
          })}
        >
          {goal.deadline === null ? null : (
            <>
              <p>Due {formatDate(goal.deadline)}</p>•
            </>
          )}
          <p>Created {formatDate(goal.createdAt)}</p>
        </div>
      </div>
      <GoalDetails
        goal={goal}
        addDepositAction={async (_, formData) => {
          "use server";
          const cookie = await ensureAuthCookie();

          const values = Object.fromEntries(formData) as Record<string, string>;
          const parsed = depositSchema.safeParse(values);
          if (!parsed.success)
            return {
              values,
              errors: z.flattenError(parsed.error).fieldErrors,
            };

          const response = await addDeposit({
            cookie,
            data: { ...parsed.data, goalId: goal.id },
          });
          switch (response.status) {
            case 204:
              redirect(`/goals/${goal.id}`);
            case 400:
              return { values, errors: response.json.errors };
            case 401:
              redirect("/signin");
            case 404:
              redirect("/");
          }
        }}
      />
    </article>
  );
};

export default GoalPage;
