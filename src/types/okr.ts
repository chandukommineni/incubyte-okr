export type Objective = {
  id: string;
  title: string;
  description: string;
};

export type ObjectiveInput = {
  title: string;
  description: string;
};

export type KeyResult = {
  id: string;
  description: string;
  isCompleted: boolean;
  objectiveId?: string;
};

export type KeyResultInput = {
  description: string;
  isCompleted?: boolean;
};
