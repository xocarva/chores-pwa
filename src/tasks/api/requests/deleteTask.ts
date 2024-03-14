import { api } from '../../../core';

const deleteTask = async (taskid: number) => {
  return api.delete(`/tasks/${taskid}/`);
};

export default deleteTask;
