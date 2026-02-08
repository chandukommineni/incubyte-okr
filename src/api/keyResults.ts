import { request } from "./http";
import type { KeyResult, KeyResultInput } from "../types/okr";

export const getKeyResults = (objectiveId: string) =>
  request<KeyResult[]>(`/objectives/${objectiveId}/key-results`);
export const createKeyResult = (objectiveId: string, input: KeyResultInput) =>
  request<KeyResult>(`/objectives/${objectiveId}/key-results`, {
    method: "POST",
    body: JSON.stringify(input),
  });
export const updateKeyResult = (
  objectiveId: string,
  keyResultId: string,
  input: Partial<KeyResultInput>,
) =>
  request<KeyResult>(
    `/objectives/${objectiveId}/key-results/${keyResultId}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );
export const deleteKeyResult = (objectiveId: string, keyResultId: string) =>
  request<void>(`/objectives/${objectiveId}/key-results/${keyResultId}`, {
    method: "DELETE",
  });
