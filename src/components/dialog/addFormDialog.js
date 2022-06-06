import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

export default function FormDialog(props) {
  const [values, setValues] = useState();
  const [listUsers, setListUsers] = useState();
  
  const handleChangeValues = (value) =>{
    setValues((prevValue) =>({
      ...prevValue,
      [value.target.id]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post('http://localhost:3001/register', {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role
    }).then(() => {
      setListUsers([
        ...listUsers,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: values.role
        }
      ]);
    });
    props.setOpen(false);
  };

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };


  return (
      <div>
        <AddCircleRoundedIcon onClick={handleClickOpen}/>
          <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Cadastrar Usuário</DialogTitle>
            <DialogContent>
              <TextField
                color="error"
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                type="text"
                fullWidth
                autoComplete="off"
                onChange={handleChangeValues}
              />
              <TextField
                color="error"
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                autoComplete="off"
                onChange={handleChangeValues}
              />
              <TextField
                color="error"
                autoFocus
                margin="dense"
                id="phone"
                label="Telefone"
                type="number"
                fullWidth
                autoComplete="off"
                onChange={handleChangeValues}
              />
              <TextField
                color="error"
                autoFocus
                margin="dense"
                id="role"
                label="Cargo"
                type="text"
                fullWidth
                autoComplete="off"
                onChange={handleChangeValues}
              />
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={handleClose}>Cancelar</Button>
              <Button color="success" onClick={handleClickButton}>Cadastrar</Button>
            </DialogActions>
          </Dialog>
        </div>
  );
}
