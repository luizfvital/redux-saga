import React, {useState, useEffect} from 'react'
import {ListGroup, ListGroupItem, Button} from 'reactstrap'

import {sortUsersByName} from '../utils/helper_functions'

function UsersList({
  users,
  onDeleteUser,
  onEditUser,
  onCancelEditUser,
  handleToggleFormBtnDisabled,
  editigFormInputsValues,
}) {
  const [sortedUsers, setSortedUsers] = useState([])

  const inputStyles = {
    border: 'none',
    outline: 'none',
  }

  useEffect(() => {
    const sortedUsers = users
      ? sortUsersByName(users).map((user) => ({...user, isEditing: false, disabled: false}))
      : []
    setSortedUsers(sortedUsers)
  }, [users])

  const handleBeginEditUser = (userId) => {
    setSortedUsers(
      sortedUsers.map((user) => {
        if (user.id === userId) {
          return {...user, isEditing: true}
        }

        return {
          ...user,
          disabled: true,
        }
      }),
    )

    onEditUser(userId)
    handleToggleFormBtnDisabled()
  }

  const handleCancelEditUser = (userId) => {
    setSortedUsers(
      sortedUsers.map((user) => {
        if (user.id === userId) {
          return {...user, isEditing: false}
        }

        return {
          ...user,
          disabled: false,
        }
      }),
    )

    onCancelEditUser()
    handleToggleFormBtnDisabled()
  }

  return (
    <ListGroup style={{marginTop: '250px'}}>
      {sortedUsers.map((user) => (
        <ListGroupItem key={user.id} style={{background: `${user.disabled ? '#f6f6f6' : 'transparent'}`}}>
          {!user.isEditing ? (
            <section style={{display: 'flex'}}>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  color: `${user.disabled ? '#f6f6f6' : 'unset'}`,
                }}>
                {`${user.firstName} ${user.lastName}`}
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', width: '147px'}}>
                <Button
                  disabled={user.disabled}
                  onClick={() => handleBeginEditUser(user.id)}
                  outline
                  color={`${user.disabled ? 'secondary' : 'primary'}`}>
                  Edit
                </Button>
                <Button
                  disabled={user.disabled}
                  onClick={() => onDeleteUser(user.id)}
                  outline
                  color={`${user.disabled ? 'secondary' : 'danger'}`}>
                  Delete
                </Button>
              </div>
            </section>
          ) : (
            <section style={{display: 'flex'}}>
              <div style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                <input style={inputStyles} readOnly type="text" defaultValue={editigFormInputsValues.firstName} />
                <input style={inputStyles} readOnly type="text" defaultValue={editigFormInputsValues.lastName} />
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', width: '147px'}}>
                <Button onClick={() => onEditUser(user.id)} outline color="primary">
                  Save
                </Button>
                <Button onClick={() => handleCancelEditUser(user.id)} outline color="secondary">
                  Cancel
                </Button>
              </div>
            </section>
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default UsersList
