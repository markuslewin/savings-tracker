"use client";

import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { User } from "@/app/utils/api";
import { FormAction } from "@/app/utils/form";
import { useActionState } from "react";
import { Form } from "react-aria-components";

type ProfileForm = {
  user: User;
  action: FormAction<"fullName" | "email">;
};

export const ProfileForm = ({ user, action }: ProfileForm) => {
  const [state, dispatch, isPending] = useActionState(action, {
    values: user,
  });
  return (
    <Form
      className={sprinkles({
        stack: "space-0300",
      })}
      action={dispatch}
      validationErrors={state.errors}
    >
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <TextField
          label="Full name"
          name="fullName"
          defaultValue={state.values.fullName}
          isRequired
        />
        <TextField
          label="Email address"
          name="email"
          defaultValue={state.values.email}
          isRequired
        />
      </div>
      <Button type="submit" isPending={isPending}>
        Edit profile
      </Button>
    </Form>
  );
};
