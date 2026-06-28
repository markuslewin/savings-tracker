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
  if (response.status === 401) unauthorized();
  if (response.status === 404) notFound();

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
                const parsing = goalSchema.safeParse(values);
                if (!parsing.success)
                  return {
                    values,
                    errors: z.flattenError(parsing.error).fieldErrors,
                  };

                const response = await updateGoal({
                  cookie,
                  data: {
                    ...parsing.data,
                    id: goal.id,
                  },
                });
                if (response?.status === 400)
                  return {
                    values,
                    errors: response.json.errors,
                  };

                redirect(`/goals/${goal.id}`);
              }}
              deleteAction={async () => {
                "use server";
                await deleteGoal({
                  cookie: await ensureAuthCookie(),
                  data: { id: goal.id },
                });
                redirect("/");
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
          const parsing = depositSchema.safeParse(values);
          if (!parsing.success)
            return {
              values,
              errors: z.flattenError(parsing.error).fieldErrors,
            };

          await addDeposit({
            cookie,
            data: { ...parsing.data, goalId: goal.id },
          });
          redirect(`/goals/${goal.id}`);
        }}
      />
    </article>
  );
};

export default GoalPage;
