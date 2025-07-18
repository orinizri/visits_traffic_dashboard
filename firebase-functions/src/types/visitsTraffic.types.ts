export type TrafficSeedEntry = {
  date: string;
  visits: number;
  createdBy?: string;
  updatedAt?: string;
};

export type TrafficSeedBody = {
  secret: string;
};
