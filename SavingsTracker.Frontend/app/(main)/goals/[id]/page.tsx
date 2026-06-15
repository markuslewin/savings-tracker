import { GoalActions } from "@/app/(main)/goals/[id]/components/goal-actions";
import { GoalDetails } from "@/app/(main)/goals/[id]/components/goal-details";
import { Back } from "@/app/components/back";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { getAuthCookie, getGoal, updateGoal } from "@/app/utils/api";
import { formatDate } from "@/app/utils/locale";
import { schema as goalSchema } from "@/app/utils/schema/goal";
import { notFound, redirect } from "next/navigation";
import * as z from "zod";

const GoalPage = async ({ params }: PageProps<"/goals/[id]">) => {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(await params);

  const result = await getGoal({
    cookie: await getAuthCookie(),
    data: {
      id,
    },
  });
  if (!result.success) throw result.error;

  const { data: goal } = result;
  if (goal === null) return notFound();

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
              goal={goal}
              editAction={async (_, formData) => {
                "use server";
                const cookie = await getAuthCookie();
                if (cookie === null) redirect("/signin");

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

                await updateGoal({
                  cookie,
                  data: {
                    ...parsing.data,
                    id: goal.id,
                  },
                });
                redirect(`/goals/${goal.id}`);
              }}
              deleteAction={async () => {
                "use server";
                console.log("deleting", goal.name);
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
        addDepositAction={async (formData) => {
          "use server";
          console.log("Add", formData.get("amount"), formData.get("note"));
        }}
      />
    </article>
  );
};

export default GoalPage;
