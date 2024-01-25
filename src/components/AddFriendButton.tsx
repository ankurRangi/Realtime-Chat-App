'use client';

import { FC, useRef, useState } from 'react';
import Button from './ui/Button';
import { addFriendValidator } from '@/lib/validation/add-friend';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import toast from 'react-hot-toast';

interface AddFriendButtonProps {}

type FormData = zod.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    // Gives error object if any to handle
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post('/api/friends/add', {
        email: validatedEmail,
      });
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof zod.ZodError) {
        setError('email', { message: error.message });
        toast.error('Something went wrong with email');
        return;
      }

      if (error instanceof AxiosError) {
        setError('email', { message: error.response?.data });
        toast.error("Something's wrong with server API");

        return;
      }
      setError('email', { message: 'Something went wrong' });
      toast.error('Something went wrong');
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>

      <div id="emailID" className="mt-2 flex gap-4">
        <input
          {...register('email')}
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        <Button>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
      {isSuccess ? (
        <p className="mt-1 text-sm text-green-600">
          Friend request sent!
          {/* {toast.success('Friend request sent!')} */}
        </p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
