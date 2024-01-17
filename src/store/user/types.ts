type UserState = {
  userInfo: {
    name: string;
    email: string;
    token: string;
    loggedIn: boolean;
    loading: boolean;
    error: string;
    role: string;
    avatar: string;
  };
};

export type { UserState };
