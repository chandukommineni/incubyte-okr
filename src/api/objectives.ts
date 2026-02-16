import api from "./http";
import type { Objective, ObjectiveInput } from "../types/okr";

export const getObjectives = async () => {
  const res = await api.get<Objective[]>("/objectives");
  return res.data;
};

export const getObjectiveById = async (objectiveId: string) => {
  const res = await api.get<Objective>(`/objectives/${objectiveId}`);
  return res.data;
};

export const createObjective = async (input: ObjectiveInput) => {
  const res = await api.post<Objective>("/objectives", input);
  return res.data;
};

export const updateObjective = (
  objectiveId: string,
  input: Partial<ObjectiveInput>,
) => {
  return api
    .patch<Objective>(`/objectives/${objectiveId}`, input)
    .then((res) => res.data);
};

export const deleteObjective = async (objectiveId: string) => {
  await api.delete(`/objectives/${objectiveId}`);
};

export const generateData= async(query:string)=>{
 return await api.post<Objective>(`/objectives/generate`,{query})
}