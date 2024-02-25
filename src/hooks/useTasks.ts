import { useEffect } from 'react';
import { useSpacesStore, useTasksStore } from '../stores';
import { api } from '../api';

export const useTasks = () => {
  const { activeSpaceId } = useSpacesStore();
  const { setTasks, tasks } = useTasksStore();

  useEffect(() => {
    const fetchTasks = async (id: number) => {
      const { data } = await api.get(`/spaces/${id}/tasks`);
      setTasks(data.tasks);
    };

    if (activeSpaceId) {
      fetchTasks(activeSpaceId);
    }
  }, [activeSpaceId, setTasks]);

  return {
    tasks,
    setTasks,
  };
};
