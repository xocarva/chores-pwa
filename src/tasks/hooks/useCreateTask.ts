import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { CreateTaskData } from '../schemas';
import { createTask as createTaskRequest } from '../api';
import { useTasksStore } from '../stores';
import { useTasks } from './useTasks';
import { useUserStore } from '../../user';

export const useCreateTask = (spaceId: number) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const { tasks } = useTasks(spaceId);
  const navigate = useNavigate();

  const createTask = async (taskData: CreateTaskData) => {
    setLoading(true);
    try {
      const task = await createTaskRequest(taskData);
      useTasksStore.getState().setTasks([...tasks, task]);

      showNotification('Tarefa creada con éxito', 'success');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else {
        setErrorMessage(
          `Houbo un erro creando a tarefa: ${(err as Error).message}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createTask,
    loading,
    errorMessage,
  };
};
