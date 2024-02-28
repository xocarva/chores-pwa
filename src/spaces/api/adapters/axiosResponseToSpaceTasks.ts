import { AxiosResponse } from 'axios';

const axiosResponseToSpaceTasks = (res: AxiosResponse): Task[] => {
  const spaces = res.data.tasks as Task[];
  return spaces;
};

export default axiosResponseToSpaceTasks;
