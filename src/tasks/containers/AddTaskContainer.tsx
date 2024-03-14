import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Space } from '../../spaces/api';
import { TaskForm } from '../components';
import { useCreateTask, useUpdateTask } from '../hooks';
import { CreateTaskData, createTaskSchema } from '../schemas';

interface AddTaskContainerProps {
  onCloseModal: () => void;
  space: Space;
  taskData?: CreateTaskData;
  taskId?: number;
}

function AddTaskContainer({
  onCloseModal,
  space,
  taskData,
  taskId,
}: AddTaskContainerProps) {
  const enrichUserSelection = (selectedUsers: any, spaceUsers: any) => {
    return selectedUsers.map((selectedUser: any) => {
      const fullUser = spaceUsers.find(
        (user: any) => user.id === selectedUser.id
      );
      return { ...selectedUser, name: fullUser.name };
    });
  };

  const users = taskData
    ? enrichUserSelection(taskData.users, space.users)
    : [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      spaceId: space.id,
      users,
      date: taskData?.date ?? null,
      description: taskData?.description ?? '',
      title: taskData?.title ?? '',
    },
  });

  const { createTask, errorMessage } = useCreateTask(space.id);
  const { updateTask, errorMessage: taskErrorMessage } = useUpdateTask(taskId);

  const onSubmit = (data: CreateTaskData) => {
    if (taskId) {
      updateTask(data);
    } else {
      createTask(data);
    }

    if (!errorMessage && !taskErrorMessage) {
      onCloseModal();
    }
  };

  return (
    space && (
      <TaskForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        users={space.users}
        control={control}
      />
    )
  );
}

AddTaskContainer.defaultProps = {
  taskId: undefined,
  taskData: undefined,
};

export default AddTaskContainer;
