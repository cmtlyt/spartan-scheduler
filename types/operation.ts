export interface Operation {
  redirect?: {
    path: string;
    callback?: string | false;
  };
  clearUserInfo?: boolean;
};
