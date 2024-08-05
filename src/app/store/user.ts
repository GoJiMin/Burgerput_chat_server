import { create } from "zustand";

interface UserStore {
  userId: string;
  setUserId: (userId: string) => void;
}

const useUserIdStore = create<UserStore>((set) => ({
  userId: "",
  setUserId: (userId: string) => set({ userId }),
}));

export const useUserId = () => useUserIdStore((state) => state.userId);
export const useSetUserId = () => useUserIdStore((state) => state.setUserId);
