import React, {useState} from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';

import {sortUsersByName} from '../utils/helper_functions';


function UsersList({users, onDeleteUser}) {

  const sortedUsers = users ? sortUsersByName(users) : [];

  const [isEditing, setIsEditing] = useState(false)

  return (
    <ListGroup>
      {
        sortedUsers.map(user => (
          <ListGroupItem key={user.id}>
            <section style={{display: 'flex'}}>
              <div style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
               {`${user.firstName} ${user.lastName}`}
              </div>

              <div style={{display: 'flex'}}>
                <Button onClick={() => onDeleteUser(user.id)} outline color="primary">Edit</Button>
                <Button onClick={() => onDeleteUser(user.id)} outline color="danger" style={{marginLeft: '10px'}}>Delete</Button>
              </div>
            </section>
          </ListGroupItem>
        ))
      }
    </ListGroup>);
}

export default UsersList;