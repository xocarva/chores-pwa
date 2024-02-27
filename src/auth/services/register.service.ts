import { api } from '../../api';
import { RegisterUserData } from '../schemas';

interface RegisterResponse {
  data: {
    userName: string;
    token: string;
  };
}

const registerService = async (
  userData: RegisterUserData
): Promise<RegisterResponse> => {
  const { name, email, password } = userData;
  return api.post(
    '/register',
    { name, email, password },
    { headers: { 'X-Is-Register-Attempt': 'true' } }
  );
};

export default registerService;
