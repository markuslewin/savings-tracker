import { split } from "@/app/(main)/goals/[id]/page.css";
import { Back } from "@/app/components/back";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { textPreset1 } from "@/app/styles/text.css";
import { getAuthCookie, getGoal } from "@/app/utils/api";
import { formatDate } from "@/app/utils/locale";
import Form from "next/form";
import { notFound } from "next/navigation";
import * as z from "zod";

const Goal = async ({ params }: PageProps<"/goals/[id]">) => {
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
              <p>Due {formatDate(goal.deadline)}</p>•{/* <Dot size="" /> */}
            </>
          )}
          <p>Created {formatDate(goal.createdAt)}</p>
        </div>
      </div>
      <div className={split}>
        <div>
          <div className={card.styles.grey}>
            <h2 className={srOnly}>Progress</h2>
            <p>{goal.target}</p>
          </div>
          <div>
            <h2>Add deposit</h2>
            <Form
              action={async (formData) => {
                "use server";
                console.log("Add", formData.get("amount"));
              }}
            >
              <TextField label="Amount" name="amount" />
              <TextField label="Note (optional)" name="note" />
              <Button variant="primary">Add funds</Button>
            </Form>
          </div>
        </div>
        <div>
          <div>
            <h2>Deposit history</h2>
            <p>{goal.deposits.length} deposits</p>
          </div>
          <ul>
            {goal.deposits.map((deposit) => {
              return (
                <li key={deposit.id}>
                  <p>{deposit.note}</p>
                  <p>{deposit.amount}</p>
                  <p>{deposit.createdAt.toString()}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Goal;
