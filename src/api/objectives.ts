import { request } from "./http";
import type { Objective, ObjectiveInput } from "../types/okr";

export const getObjectives = () =>
  request<Objective[]>({ url: "/objectives", method: "GET" });


export const getObjectiveById = (objectiveId: string) =>
  request<Objective>({ url: `/objectives/${objectiveId}`, method: "GET" });

export const createObjective = (input: ObjectiveInput) =>
  request<Objective>({
    url: "/objectives",
    method: "POST",
    data: input,
  });

export const updateObjective = (
  objectiveId: string,
  input: Partial<ObjectiveInput>,
) =>
  request<Objective>({
    url: `/objectives/${objectiveId}`,
    method: "PATCH",
    data: input,
  });

export const deleteObjective = (objectiveId: string) =>
  request<void>({
    url: `/objectives/${objectiveId}`,
    method: "DELETE",
  });
