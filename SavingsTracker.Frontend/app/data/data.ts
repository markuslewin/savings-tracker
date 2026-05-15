import data from "@/app/data/data.json";

export const getGoal = async (id: string) => {
  const goal = data.goals.find((goal) => {
    return goal.id === id;
  });
  if (goal === undefined) {
    return null;
  }

  return {
    id: goal.id,
    name: goal.name,
    target: goal.target,
    deadline: goal.deadline,
    deposits: goal.deposits.map((deposit) => {
      return {
        id: deposit.id,
        amount: deposit.amount,
        note: deposit.note,
      };
    }),
  };
};
