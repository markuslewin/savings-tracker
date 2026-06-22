"use client";

import { DialogButton } from "@/app/(main)/components/dialog-button";
import { userOption } from "@/app/(main)/components/layout-impl.css";
import { Popover } from "@/app/(main)/components/popover";
import { container, header } from "@/app/(main)/layout.css";
import { getInitial } from "@/app/(main)/utils/avatar";
import { avatar } from "@/app/(main)/utils/avatar.css";
import { LogoLink } from "@/app/components/logo-link";
import PlusIcon from "@/app/icons/icon-plus.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { User } from "@/app/utils/api";
import { Hr } from "@/app/utils/hr";
import { NewGoalDialog } from "@/app/utils/new-goal-dialog/component";
import { OptimisticSearchParams } from "@/app/utils/optimistic-search-params/component";
import Link from "next/link";
import { useState } from "react";
import { Button, DialogTrigger } from "react-aria-components";

type LayoutImplProps = LayoutProps<"/"> & {
  user: User | null;
  logOutAction: () => Promise<void>;
};

export const LayoutImpl = ({
  user,
  children,
  logOutAction,
}: LayoutImplProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <OptimisticSearchParams>
      <div>
        <header className={header}>
          <div className={container}>
            <div
              className={sprinkles({
                cluster: "space-0200",
                justifyContent: "space-between",
              })}
            >
              <LogoLink />
              <div
                className={sprinkles({
                  cluster: "space-0200",
                })}
              >
                <DialogButton dialogId="new-goal" user={user} icon={PlusIcon}>
                  New goal
                </DialogButton>
                {user === null ? null : (
                  <DialogTrigger
                    isOpen={isPopoverOpen}
                    onOpenChange={setIsPopoverOpen}
                  >
                    <Button className={avatar}>
                      <span className={srOnly}>Signed in as {user.email}</span>
                      <span aria-hidden="true">
                        {getInitial(user.fullName)}
                      </span>
                    </Button>
                    <Popover
                      className={sprinkles({
                        stack: "space-0150",
                        color: "neutral-300",
                      })}
                      placement="bottom end"
                    >
                      <div
                        className={sprinkles({
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          alignItems: "center",
                          gap: "space-0100",
                        })}
                      >
                        <div className={avatar} aria-hidden="true">
                          {getInitial(user.fullName)}
                        </div>
                        <div>
                          <h2
                            className={sprinkles({
                              color: "neutral-0",
                            })}
                            data-testid="fullName"
                          >
                            {user.fullName}
                          </h2>
                          <p
                            className={sprinkles({
                              text: "6",
                              color: "neutral-300",
                            })}
                            data-testid="email"
                          >
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Hr color={"neutral-700"} />
                      <div
                        className={sprinkles({
                          stack: "space-0",
                        })}
                      >
                        <Link
                          className={userOption.grey}
                          href={"/profile"}
                          onNavigate={() => {
                            setIsPopoverOpen(false);
                          }}
                        >
                          Edit profile
                        </Link>
                        <Link
                          className={userOption.grey}
                          href={"/new-password"}
                        >
                          Change password
                        </Link>
                      </div>
                      <Hr color={"neutral-700"} />
                      <form
                        className={sprinkles({ display: "grid" })}
                        action={logOutAction}
                      >
                        <Button className={userOption.red} type="submit">
                          Sign out
                        </Button>
                      </form>
                    </Popover>
                  </DialogTrigger>
                )}
              </div>
            </div>
          </div>
        </header>
        <main
          className={sprinkles({
            paddingBlock: {
              mobile: "space-0400",
              tablet: "space-0500",
              desktop: "space-0600",
            },
          })}
        >
          <div className={container}>{children}</div>
        </main>
        <NewGoalDialog user={user} />
      </div>
    </OptimisticSearchParams>
  );
};
