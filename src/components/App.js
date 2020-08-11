import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Alert} from 'reactstrap'

import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from '../redux/actions/users'

import UsersList from './UsersList'
import NewUserForm from './NewUserForm'

function App() {
  const users = useSelector((state) => state.users.items)
  const error = useSelector((state) => state.users.error)
  const dispatch = useDispatch()

  const [userToBeUpdated, setUserToBeUpdated] = useState({})
  const [formBtnDisabled, setFormBtnDisabled] = useState(false)
  const [editigFormInputsValues, setEditigFormInputsValues] = useState(userToBeUpdated)

  useEffect(() => {
    dispatch(getUsersRequest())
  }, [dispatch])

  useEffect(() => {
    setEditigFormInputsValues(userToBeUpdated)
  }, [userToBeUpdated])

  const onDismiss = () => dispatch(usersError({error: ''}))

  const handleSubmit = ({firstName, lastName}) => {
    dispatch(createUserRequest({firstName, lastName}))
  }

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserRequest(userId))
  }

  const handleEditUser = (userId) => {
    setUserToBeUpdated(users.find((user) => user.id === userId))
  }

  const handleCancelEditUser = () => {
    setUserToBeUpdated({})
  }

  const handleToggleFormBtnDisabled = () => {
    setFormBtnDisabled(!formBtnDisabled)
  }

  return (
    <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px', position: 'relative'}}>
      <Alert color="info" isOpen={!!error} toggle={onDismiss}>
        {error}
      </Alert>
      <NewUserForm
        onSubmit={handleSubmit}
        userToBeUpdated={userToBeUpdated}
        formBtnDisabled={formBtnDisabled}
        setEditigFormInputsValues={setEditigFormInputsValues}
      />
      <UsersList
        users={users}
        onDeleteUser={handleDeleteUser}
        onEditUser={handleEditUser}
        onCancelEditUser={handleCancelEditUser}
        handleToggleFormBtnDisabled={handleToggleFormBtnDisabled}
        editigFormInputsValues={editigFormInputsValues}
      />
    </div>
  )
}

export default App
