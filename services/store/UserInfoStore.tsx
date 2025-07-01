import { create } from 'zustand';

export type UserInfoState = {
    username: string | null;
    email: string | null;
    address: string | null;
    phone_number: string | null;
    loyalty: number | null;
    points: number | null;
};

export const useUserInfoStore = create<UserInfoState>((set) => ({
    username: null,
    email: null,
    address: null,
    phone_number: null,
    loyalty: 0,
    points: 0,
    setUserInfo: (name: string | null, email: string | null, address: string | null) => set(() => ({
        name: name,
        email,
        address,
        phone_number: null, // Assuming phone_number is not set here
        loyalty: 0, // Assuming loyalty is not set here
        points: 0 // Assuming points is not set here
    }))
}));