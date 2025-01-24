// lib/searchHandler.ts
import { getAllUsers, getAllPost } from '@/lib/serveractions';
import { AppDispatch } from '@/lib/store'; // Import your AppDispatch type if available
import { setPosts, setSearching, setSearchUsers } from '@/lib/feature/todos/todoSlice';

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
