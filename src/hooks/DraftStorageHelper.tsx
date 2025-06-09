import { useDraftStorage } from "./useDraftStorage";

export const DraftStorageHelper = ({ storageKey }: { storageKey?: string }) => {
  useDraftStorage(storageKey);
  return null;
};
