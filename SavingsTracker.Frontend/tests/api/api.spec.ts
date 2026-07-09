import { register } from "@/tests/utils";
import { faker } from "@faker-js/faker";
import { APIRequestContext, expect, test } from "@playwright/test";

test("register validation", async ({ request }) => {
  const response = await request.post("/accounts/register", {
    data: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    fullName: ["Required"],
    email: ["Required"],
    password: ["Required"],
  });
});

test("login validation", async ({ request }) => {
  const response = await request.post("/accounts/login", {
    data: {
      email: "",
      password: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    email: ["Required"],
    password: ["Required"],
  });
});

test("login incorrect password", async ({ request }) => {
  const { email } = await register();
  const response = await request.post("/accounts/login", {
    data: {
      email,
      password: "incorrect",
    },
  });

  expect(response.status()).toBe(401);
});

test("post user info validation", async ({ request }) => {
  await signIn(request);
  const response = await request.post("/accounts/info", {
    data: {
      fullName: "",
      email: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    fullName: ["Required"],
    email: ["Required"],
  });
});

test("change password validation", async ({ request }) => {
  await signIn(request);
  const response = await request.post("/accounts/changePassword", {
    data: {
      password: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    password: ["Required"],
  });
});

test("add goal validation", async ({ request }) => {
  await signIn(request);
  const response = await request.post("/goals", {
    data: {
      name: "",
      target: "",
      deadline: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    name: ["Required"],
    target: ["Required"],
  });
});

test("add goal without deadline", async ({ request }) => {
  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target: faker.finance.amount(),
        deadline: "",
      },
    })
  ).json();

  const response = await request.get(`/goals/${encodeURIComponent(id)}`);

  expect(response.status()).toBe(200);
  expect(response.json()).resolves.toMatchObject({
    deadline: null,
  });
});

test("add goal with deadline", async ({ request }) => {
  const deadline = "2026-07-08";

  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target: faker.finance.amount(),
        deadline,
      },
    })
  ).json();

  const response = await request.get(`/goals/${encodeURIComponent(id)}`);

  expect(response.status()).toBe(200);
  expect(response.json()).resolves.toMatchObject({
    deadline,
  });
});

test("patch goal validation", async ({ request }) => {
  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target: faker.finance.amount(),
        deadline: "",
      },
    })
  ).json();

  const response = await request.patch(`/goals/${id}`, {
    data: {
      name: "",
      target: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    name: ["Required"],
    target: ["Required"],
  });
});

test("patch goal deadline", async ({ request }) => {
  const deadline = "2026-03-10";

  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target: faker.finance.amount(),
        deadline: "",
      },
    })
  ).json();

  await request.patch(`/goals/${id}`, {
    data: {
      deadline,
    },
  });
  const response = await request.get(`/goals/${id}`);

  expect(response.status()).toBe(200);
  expect(response.json()).resolves.toMatchObject({
    deadline,
  });
});

test("patch goal name only", async ({ request }) => {
  const name = faker.food.dish();
  const target = faker.finance.amount();
  const deadline = "2026-08-05";

  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target,
        deadline,
      },
    })
  ).json();

  await request.patch(`/goals/${id}`, {
    data: {
      name,
    },
  });
  const response = await request.get(`/goals/${id}`);
  const json = await response.json();

  expect(response.status()).toBe(200);
  expect({
    name: json.name,
    target: json.target,
    deadline: json.deadline,
  }).toStrictEqual({
    name,
    target: Number(target),
    deadline,
  });
});

test("add deposit validation", async ({ request }) => {
  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target: faker.finance.amount(),
        deadline: "",
      },
    })
  ).json();

  const response = await request.post(`/goals/${id}/deposits`, {
    data: {
      amount: "",
      note: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    amount: ["Required"],
  });
});

const signIn = async (request: APIRequestContext) => {
  const user = await register();
  await request.post("/accounts/login", {
    data: {
      email: user.email,
      password: user.password,
    },
  });

  return user;
};
