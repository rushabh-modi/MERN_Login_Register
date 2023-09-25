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
        console.log(responce.data);
        isMounted && setUsers(responce.data);
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
          {users.map((users, i) => (
            <li key={i}>{users?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};
export default Users;
