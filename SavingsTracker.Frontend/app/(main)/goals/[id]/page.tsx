import { GoalDetails } from "@/app/(main)/goals/[id]/components/goal-details";
import { Back } from "@/app/components/back";
import { Button } from "@/app/components/button";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { textPreset1 } from "@/app/styles/text.css";
import { getAuthCookie, getGoal } from "@/app/utils/api";
import { formatDate } from "@/app/utils/locale";
import { notFound } from "next/navigation";
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
            <Button variant="tertiary">Edit goal</Button>
            <Button
              className={sprinkles({ color: "red-500" })}
              variant="tertiary"
            >
              Delete goal
            </Button>
          </div>
        </header>
        <h1 className={textPreset1}>{goal.name}</h1>
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
