import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Space } from '../../spaces/api';
import { AddTaskForm } from '../components';
import { useCreateTask } from '../hooks';
import { CreateTaskData, createTaskSchema } from '../schemas';

interface AddTaskContainerProps {
  onCloseModal: () => void;
  space: Space;
}

function AddTaskContainer({ onCloseModal, space }: AddTaskContainerProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      spaceId: space.id,
      users: [],
      date: null,
    },
  });

  const { createTask, errorMessage } = useCreateTask(space.id);

  const onSubmit = (taskData: CreateTaskData) => {
    createTask(taskData);
    if (!errorMessage) {
      onCloseModal();
    }
  };

  return (
    space && (
      <AddTaskForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        users={space.users}
        control={control}
      />
    )
  );
}

export default AddTaskContainer;
