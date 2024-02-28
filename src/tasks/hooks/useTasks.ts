import { useEffect, useState } from 'react';
import { useTasksStore } from '../stores';
import { getTasks } from '../api';

export const useTasks = (spaceId: number) => {
  const { setTasks, tasks } = useTasksStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (spaceId) {
      const fetchTasks = async () => {
        setLoading(true);
        try {
          const fetchedTasks = await getTasks(spaceId);
          setTasks(fetchedTasks);
          setError(null);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message || 'Produciuse un erro obtendo tarefas');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [spaceId, setTasks]);

  return { tasks, loading, error };
};
