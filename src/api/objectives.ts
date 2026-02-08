import { request } from "./http";
import type { Objective, ObjectiveInput } from "../types/okr";

export const getObjectives = () => request<Objective[]>("/objectives");
export const getObjectiveById = (objectiveId: string) =>
  request<Objective>(`/objectives/${objectiveId}`);
export const createObjective = (input: ObjectiveInput) =>
  request<Objective>("/objectives", {
    method: "POST",
    body: JSON.stringify(input),
  });
export const updateObjective = (
  objectiveId: string,
  input: Partial<ObjectiveInput>,
) =>
  request<Objective>(`/objectives/${objectiveId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
export const deleteObjective = (objectiveId: string) =>
  request<void>(`/objectives/${objectiveId}`, { method: "DELETE" });
