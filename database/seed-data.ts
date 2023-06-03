interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "finished test",
      status: "finished",
      createdAt: Date.now(),
    },
    {
      description: " pending test",
      status: "pending",
      createdAt: Date.now() - 100000,
    },
    {
      description: "in progress test",
      status: "in-progress",
      createdAt: Date.now() - 5555,
    },
  ],
};
