import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';

interface AuthContainerProps {
  formType: string;
}

function AuthContainer({ formType }: AuthContainerProps) {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState(formType);

  const toggleForm = () => {
    const newPath = currentForm === 'login' ? '/register' : '/login';
    navigate(newPath);
    setCurrentForm(newPath.replace('/', ''));
  };

  return (
    <div>
      {currentForm === 'login' ? (
        <LoginContainer onToggleForm={toggleForm} />
      ) : (
        <RegisterContainer onToggleForm={toggleForm} />
      )}
    </div>
  );
}

export default AuthContainer;
