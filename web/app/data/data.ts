import data from "@/app/data/data.json";
import { Filter } from "@/app/utils/filter";
import { Sort } from "@/app/utils/sort";

const filterMap: Record<
  Filter,
  (goal: { target: number; saved: number }) => boolean
> = {
  all: () => {
    return true;
  },
  "not-started": (goal) => {
    return goal.saved <= 0;
  },
  "in-progress": (goal) => {
    return 0 < goal.saved && goal.saved < goal.target;
  },
  completed: (goal) => {
    return goal.saved >= goal.target;
  },
};

export const getDashboard = async ({
  filter,
}: {
  filter: Filter;
  sort: Sort;
}) => {
  const goals = data.goals.map((goal) => {
    return {
      id: goal.id,
      name: goal.name,
      target: goal.target,
      deadline: goal.deadline === null ? null : new Date(goal.deadline),
      saved: goal.deposits.reduce((saved, deposit) => {
        return saved + deposit.amount;
      }, 0),
    };
  });
  return {
    summary: {
      totalSavings: goals.reduce((sum, goal) => {
        return sum + goal.saved;
      }, 0),
      activeGoals: goals.filter((goal) => {
        return goal.saved < goal.target;
      }).length,
      goalsCompleted: goals.filter((goal) => {
        return goal.saved >= goal.target;
      }).length,
    },
    noGoals: goals.length <= 0,
    goals: goals.filter(filterMap[filter]),
  };
};

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
