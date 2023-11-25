import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import Users from '../components/Users';

// export const loader = async () => {
//   try {
//     const response = await customFetch.get('/users/admin/app-stats');
//     return response.data;
//   } catch (error) {
//     toast.error('Nincs jogosultságod az oldal megtekintéséhez');
//     return redirect('/dashboard');
//   }
// };

const Admin = () => {
  // const { users, books } = useLoaderData();

  return (
    <Users/>
  );
};
export default Admin;