export interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  login: (userName: string) => void;
  logout: () => void;
}
