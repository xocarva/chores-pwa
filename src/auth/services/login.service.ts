import { api } from '../../api';
import { LoginUserData } from '../schemas';

interface LoginResponse {
  data: {
    userName: string;
    token: string;
  };
}

const loginService = async (
  userData: LoginUserData
): Promise<LoginResponse> => {
  const { email, password } = userData;
  return api.post(
    '/login',
    { email, password },
    { headers: { 'X-Is-Login-Attempt': 'true' } }
  );
};

export default loginService;
