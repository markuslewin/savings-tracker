"use client";

import { depositLayout } from "@/app/(main)/goals/[id]/components/goal-details.css";
import { split } from "@/app/(main)/goals/[id]/page.css";
import { Button } from "@/app/components/button";
import { Progress } from "@/app/components/progress";
import { progressColor } from "@/app/components/progress.css";
import { TextField } from "@/app/components/text-field";
import ArrowDownIcon from "@/app/icons/icon-arrow-down.svg";
import DollarIcon from "@/app/icons/icon-dollar.svg";
import * as card from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { Goal } from "@/app/utils/api";
import { formatDate, formatPercent, formatUsd } from "@/app/utils/locale";
import { nbsp } from "@/app/utils/unicode";
import clsx from "clsx";

type GoalProps = {
  goal: Goal;
  addDepositAction: (formData: FormData) => Promise<void>;
};

export const GoalDetails = ({ goal, addDepositAction }: GoalProps) => {
  const progress = 0.5;
  const remaining = 123;
  const saved = 321;

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
              stack: "space-0300",
            }),
          )}
        >
          <h2 className={srOnly}>Progress</h2>
          <div
            className={sprinkles({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            })}
          >
            <strong
              className={sprinkles({
                text: "1",
              })}
            >
              {formatPercent(progress)}
            </strong>
            <p
              className={sprinkles({
                text: "4",
                color: "neutral-300",
              })}
            >
              {formatUsd(remaining)} remaining
            </p>
          </div>
          <div
            className={sprinkles({
              stack: "space-0200",
            })}
          >
            <Progress className={progressColor.orange} value={0.5} />
            <div
              className={sprinkles({
                display: "flex",
                justifyContent: "space-between",
                text: "6",
              })}
            >
              <p
                className={sprinkles({
                  stack: "space-0050",
                })}
              >
                <span>{formatUsd(saved)}</span>
                <span
                  className={sprinkles({
                    color: "neutral-300",
                  })}
                >
                  Saved so far
                </span>
              </p>
              <p
                className={sprinkles({
                  stack: "space-0050",
                  textAlign: "end",
                })}
              >
                <span>of {formatUsd(goal.target)}</span>
                <span
                  className={sprinkles({
                    color: "neutral-300",
                  })}
                >
                  Target
                </span>
              </p>
            </div>
          </div>
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
          <h2 className={sprinkles({ text: "4" })}>Add deposit</h2>
          <form
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
          </form>
        </div>
      </div>
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <div
          className={sprinkles({
            cluster: "space-0200",
            justifyContent: "space-between",
          })}
        >
          <h2 className={sprinkles({ text: "4" })}>Deposit history</h2>
          <p
            className={sprinkles({
              text: "6",
              color: "neutral-300",
            })}
          >
            {goal.deposits.length} deposits
          </p>
        </div>
        <ul
          className={sprinkles({
            stack: "space-0",
            text: "6",
          })}
          role="list"
        >
          {goal.deposits.map((deposit) => {
            return (
              <li
                className={clsx(
                  depositLayout,
                  sprinkles({
                    borderBlockStart: "solid",
                    borderColor: "neutral-800",
                    paddingBlock: "space-0200",
                  }),
                )}
                key={deposit.id}
              >
                <div
                  className={sprinkles({
                    width: "size-0500",
                    height: "size-0500",
                    border: "solid",
                    borderRadius: "radius-full",
                    display: "grid",
                    placeItems: "center",
                    background: "neutral-800",
                    color: "neutral-0",
                  })}
                >
                  <ArrowDownIcon
                    className={sprinkles({
                      width: "auto",
                      height: "size-0250",
                    })}
                  />
                </div>
                <div
                  className={sprinkles({
                    stack: "space-0025",
                  })}
                >
                  <h3>{deposit.note.length <= 0 ? nbsp : deposit.note}</h3>
                  <p>
                    <span className={srOnly}>Created at: </span>
                    {formatDate(deposit.createdAt)}
                  </p>
                </div>
                <p
                  className={sprinkles({
                    text: "5-semiBold",
                    color: "green-500",
                  })}
                >
                  <span className={srOnly}>Amount: </span>+
                  {formatUsd(deposit.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
