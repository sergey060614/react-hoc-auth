export interface CurrentUser {
  roles: string[];
}

export interface WithAuthProps {
  currentUser?: CurrentUser | null;
}
