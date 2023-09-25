/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const responce = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        const userNames = responce.data.map((user) => user.username);
        console.log(responce.data);
        isMounted && setUsers(userNames);
      } catch (error) {
        console.log(error);
        navigate('/login', { state: { from: location }, replace: true });
      } finally {
        if (isMounted) {
          controller.abort();
        }
      }
    };
    getUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul style={{ listStyleType: 'none' }}>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};
export default Users;
