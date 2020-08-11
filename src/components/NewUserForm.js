import React, {useState, useEffect, useRef} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

function NewUserForm({onSubmit, userToBeUpdated, formBtnDisabled, setEditigFormInputsValues}) {
  const [userName, setUserName] = useState({firstName: '', lastName: ''})

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (Object.keys(userToBeUpdated).length) {
      setUserName({
        firstName: userToBeUpdated.firstName,
        lastName: userToBeUpdated.lastName,
      })

      inputRef.current.focus()
    } else {
      setUserName({firstName: '', lastName: ''})
    }
  }, [userToBeUpdated])

  const handleSubmit = (evt) => {
    evt.preventDefault()

    onSubmit(userName)

    setUserName({firstName: '', lastName: ''})

    inputRef.current.focus()
  }

  const handleInputChange = (evt) => {
    setUserName({
      ...userName,
      [evt.target.name]: evt.target.value,
    })
    setEditigFormInputsValues({
      ...userName,
      [evt.target.name]: evt.target.value,
    })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      style={{position: 'fixed', zIndex: 2, width: '560px', background: '#FFF', padding: '20px 0', top: 0}}>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          innerRef={inputRef}
          required
          name="firstName"
          placeholder="First name"
          value={userName.firstName}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Last Name</Label>
        <Input
          required
          name="lastName"
          placeholder="Last name"
          value={userName.lastName}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Button
          disabled={formBtnDisabled}
          block
          outline
          type="submit"
          color={`${formBtnDisabled ? 'secondary' : 'primary'}`}>
          Create
        </Button>
      </FormGroup>
    </Form>
  )
}

export default NewUserForm
