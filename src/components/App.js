import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Alert } from 'reactstrap';

import {getUsersRequest, createUserRequest,deleteUserRequest, usersError} from '../redux/actions/users';

import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

function App() {

  const users = useSelector(state => state.users.items);
  const error = useSelector(state => state.users.error)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
    
  },[dispatch]);

  const onDismiss = () => dispatch(usersError({error: ''}));


  const handleSubmit = ({firstName, lastName}) => {
    dispatch(createUserRequest({firstName, lastName}));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserRequest(userId))
  };

  return (
    <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
      <Alert color="info" isOpen={!!error} toggle={onDismiss}>
        {error}
      </Alert>
      <NewUserForm onSubmit={handleSubmit}/>
      <UsersList users={users} onDeleteUser={handleDeleteUser}/>
    </div>
  );
};

export default App;
