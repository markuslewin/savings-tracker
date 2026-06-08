"use client";

import { split } from "@/app/(main)/goals/[id]/page.css";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import DollarIcon from "@/app/icons/icon-dollar.svg";
import * as card from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { textPreset4 } from "@/app/styles/text.css";
import { Goal } from "@/app/utils/api";
import clsx from "clsx";
import Form from "next/form";

type GoalProps = {
  goal: Goal;
  addDepositAction: (formData: FormData) => Promise<void>;
};

export const GoalDetails = ({ goal, addDepositAction }: GoalProps) => {
  return (
    <div className={split}>
      <div
        className={sprinkles({
          stack: "space-0300",
        })}
      >
        <div
          className={clsx(
            card.styles.grey,
            sprinkles({
              cardSpace: {
                mobile: "space-0200",
                tablet: "space-0300",
              },
            }),
          )}
        >
          <h2 className={srOnly}>Progress</h2>
          <p>{goal.target}</p>
        </div>
        <div
          className={clsx(
            card.styles.grey,
            sprinkles({
              stack: "space-0300",
              cardSpace: {
                mobile: "space-0200",
                tablet: "space-0300",
              },
            }),
          )}
        >
          <h2 className={textPreset4}>Add deposit</h2>
          <Form
            className={sprinkles({
              stack: "space-0300",
            })}
            action={addDepositAction}
          >
            <div
              className={sprinkles({
                stack: "space-0250",
              })}
            >
              <TextField
                label="Amount"
                icon={DollarIcon}
                name="amount"
                placeholder="0.00"
                isRequired
              />
              <TextField
                label="Note (optional)"
                name="note"
                placeholder="e.g. Monthly savings"
              />
            </div>
            <Button type="submit" variant="primary">
              Add funds
            </Button>
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
  );
};
