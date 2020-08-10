import React, {useState, useEffect, useRef} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

function NewUserForm({onSubmit}) {
  const [userName, setUserName] = useState({firstName: '', lastName: ''});

  const inputRef = useRef()

  useEffect(() =>{
    inputRef.current.focus()
  }, [])

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(userName);

    setUserName({firstName: '', lastName: ''});

    inputRef.current.focus()
  }

  const handleInputChange = (evt) => {
    setUserName({
      ...userName,
      [evt.target.name]: evt.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          First Name
        </Label>
        <Input innerRef={inputRef} required name="firstName" placeholder="First name" value={userName.firstName} onChange={handleInputChange} />
      </FormGroup>

      <FormGroup>
        <Label>
          Last Name
        </Label>
        <Input required name="lastName" placeholder="Last name" value={userName.lastName} onChange={handleInputChange} />
      </FormGroup>

      <FormGroup>
        <Button block outline type="submit" color="primary">Create</Button>
      </FormGroup>
    </Form>
  );
}

export default NewUserForm;