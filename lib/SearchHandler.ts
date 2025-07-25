// lib/searchHandler.ts
import { getAllUsers } from '@/lib/serverAction/userAction';
import { AppDispatch } from '@/lib/store'; // Import your AppDispatch type if available
import { setPosts, setSearching, setSearchUsers } from '@/lib/feature/todos/todoSlice';
import { getAllPost } from './serverAction/postAction';

export const handleSearch = async (
  input: string,
  dispatch: AppDispatch,
): Promise<void> => {
  dispatch(setSearching(true));
  const searchedUsers = await getAllUsers(input);
  const posts = await getAllPost(input);
  dispatch(setPosts(posts));
  dispatch(setSearchUsers(searchedUsers));
};
