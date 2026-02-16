import api from "./http";
import type { KeyResult, KeyResultInput } from "../types/okr";

export const getKeyResults = async (objectiveId: string) => {
  const res = await api.get<KeyResult[]>(
    `/objectives/${objectiveId}/key-results`,
  );
  return res.data;
};

export const createKeyResult = async (
  objectiveId: string,
  input: KeyResultInput,
) => {
  const res = await api.post<KeyResult>(
    `/objectives/${objectiveId}/key-results`,
    input,
  );
  return res.data;
};

export const updateKeyResult = (
  objectiveId: string,
  keyResultId: string,
  input: Partial<KeyResultInput>,
) => {
  return api
    .patch<KeyResult>(
      `/objectives/${objectiveId}/key-results/${keyResultId}`,
      input,
    )
    .then((res) => res.data);
};

export const deleteKeyResult = async (
  objectiveId: string,
  keyResultId: string,
) => {
  await api.delete(
    `/objectives/${objectiveId}/key-results/${keyResultId}`,
  );
};

