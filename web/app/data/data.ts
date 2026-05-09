import data from "@/app/data/data.json";
import { Filter } from "@/app/utils/filter";
import { Sort } from "@/app/utils/sort";

const filterMap: Record<
  Filter,
  (goal: { target: number; deposits: { amount: number }[] }) => boolean
> = {
  all: () => {
    return true;
  },
  "not-started": (goal) => {
    return goal.deposits.length <= 0;
  },
  "in-progress": (goal) => {
    const total = goal.deposits.reduce((sum, deposit) => {
      return sum + deposit.amount;
    }, 0);
    return 0 < total && total < goal.target;
  },
  completed: (goal) => {
    const total = goal.deposits.reduce((sum, deposit) => {
      return sum + deposit.amount;
    }, 0);
    return total >= goal.target;
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
      deposits: goal.deposits.map((deposit) => {
        return {
          amount: deposit.amount,
        };
      }),
    };
  });
  return {
    summary: {
      totalSavings: goals
        .flatMap((goal) => {
          return goal.deposits;
        })
        .reduce((sum, deposit) => {
          return sum + deposit.amount;
        }, 0),
      activeGoals: goals.filter((goal) => {
        return (
          goal.deposits.reduce((sum, deposit) => {
            return sum + deposit.amount;
          }, 0) < goal.target
        );
      }).length,
      goalsCompleted: goals.filter((goal) => {
        return (
          goal.deposits.reduce((sum, deposit) => {
            return sum + deposit.amount;
          }, 0) >= goal.target
        );
      }).length,
    },
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
