import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const responce = await axios.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prevState) => {
      console.log(JSON.stringify(prevState));
      console.log(responce.data.accessToken);
      return {
        ...prevState,
        roles: responce.data.roles,
        accessToken: responce.data.accessToken,
      };
    });
    return responce.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
