import { goals as sampleGoals } from "@/app/utils/goal-service/data.json";
import { getGoals as _getGoals } from "@/app/utils/api";

export const getGoals = ({ cookie }: { cookie: string | null }) => {
  if (cookie === null) {
    return sampleGoals.map((g, i) => ({
      ...g,
      id: i,
      deadline: g.deadline === null ? null : new Date(g.deadline),
      createdAt: new Date(g.createdAt),
      deposits: g.deposits.map((d, j) => ({
        ...d,
        // Not globally unique, but we only use them as parts of a goal
        id: j,
        createdAt: new Date(d.createdAt),
      })),
    }));
  }
  return _getGoals({ cookie });
};
