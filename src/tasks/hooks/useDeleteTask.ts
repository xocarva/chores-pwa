import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { deleteTask as deleteTaskRequest } from '../api';
import { useTasksStore } from '../stores';
import { useUserStore } from '../../user';

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await deleteTaskRequest(id);
      const { tasks } = useTasksStore.getState();
      useTasksStore.getState().setTasks(tasks.filter((task) => task.id !== id));

      showNotification('Tarefa eliminada con éxito', 'success');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else {
        setErrorMessage(
          `Houbo un erro eliminando a tarefa: ${(err as Error).message}`
        );
        showNotification(
          `Houbo un erro eliminando a tarefa: ${(err as Error).message}`,
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteTask,
    loading,
    errorMessage,
  };
};
