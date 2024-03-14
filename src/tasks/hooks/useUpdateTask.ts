import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { CreateTaskData } from '../schemas';
import { updateTask as updateTaskRequest } from '../api';
import { useTasksStore } from '../stores';
import { useUserStore } from '../../user';

export const useUpdateTask = (taskId?: number) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  const updateTask = async (taskData: CreateTaskData) => {
    if (!taskId) {
      setErrorMessage('Falta id da tarefa');
      return;
    }
    setLoading(true);
    try {
      const task = await updateTaskRequest(taskId, taskData);
      const { tasks } = useTasksStore.getState();
      useTasksStore
        .getState()
        .setTasks(tasks.map((t) => (t.id === taskId ? task : t)));

      showNotification('Tarefa actualizada con éxito', 'success');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else {
        setErrorMessage(
          `Houbo un erro actualizando a tarefa: ${(err as Error).message}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    updateTask,
    loading,
    errorMessage,
  };
};
