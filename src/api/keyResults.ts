import { request } from "./http";
import type { KeyResult, KeyResultInput } from "../types/okr";

export const getKeyResults = (objectiveId: string) =>
  request<KeyResult[]>({
    url: `/objectives/${objectiveId}/key-results`,
    method: "GET",
  });

export const createKeyResult = (objectiveId: string, input: KeyResultInput) =>
  request<KeyResult>({
    url: `/objectives/${objectiveId}/key-results`,
    method: "POST",
    data: input,
  });

export const updateKeyResult = (
  objectiveId: string,
  keyResultId: string,
  input: Partial<KeyResultInput>,
) =>
  request<KeyResult>({
    url: `/objectives/${objectiveId}/key-results/${keyResultId}`,
    method: "PATCH",
    data: input,
  });
  
export const deleteKeyResult = (objectiveId: string, keyResultId: string) =>
  request<void>({
    url: `/objectives/${objectiveId}/key-results/${keyResultId}`,
    method: "DELETE",
  });
