import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const responce = await axios('/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
