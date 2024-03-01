import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../user';
import { useCreateSpace } from '../hooks/useCreateSpace';
import { AddSpaceForm } from '../components';
import { CreateSpaceData, createSpaceSchema } from '../schemas';

interface AddSpaceContainerProps {
  onCloseModal: () => void;
}

function AddSpaceContainer({ onCloseModal }: AddSpaceContainerProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateSpaceData>({
    resolver: zodResolver(createSpaceSchema),
  });

  const { createSpace, errorMessage } = useCreateSpace();
  const { userId } = useUser();

  const onSubmit = (spaceData: CreateSpaceData) => {
    createSpace(spaceData);
    if (!errorMessage) {
      onCloseModal();
    }
  };

  useEffect(() => {
    if (userId) {
      setValue('users', [{ id: Number(userId), admin: true }]);
    }
  }, [setValue, userId]);

  return (
    <AddSpaceForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    />
  );
}

export default AddSpaceContainer;
