import { useEffect } from 'react';
import { api } from '../../core/api';
import { useSpacesStore } from '../../spaces';
import { useTasksStore } from '../stores';

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
