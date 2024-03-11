import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddTaskForm } from '../components';
import { useCreateTask } from '../hooks';
import { CreateTaskData, createTaskSchema } from '../schemas';

interface AddTaskContainerProps {
  onCloseModal: () => void;
  spaceId: number;
}

function AddTaskContainer({ onCloseModal, spaceId }: AddTaskContainerProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      spaceId,
      users: [],
    },
  });

  const { createTask, errorMessage } = useCreateTask(spaceId);

  const onSubmit = (taskData: CreateTaskData) => {
    createTask(taskData);
    if (!errorMessage) {
      onCloseModal();
    }
  };

  const users = [
    { id: 1, name: 'User1' },
    { id: 2, name: 'User2' },
  ];

  return (
    <AddTaskForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      users={users}
      control={control}
    />
  );
}

export default AddTaskContainer;
