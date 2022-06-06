import React, { useState } from 'react';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FormDialog(props) {
  const [values, setValues] = useState({
    id: props.id,
    name: props.name,
    email: props.email,
    phone: props.phone,
    role: props.role

  });
  
  
  const handleChangeValues = (value) =>{
    setValues((prevValue) =>({
      ...prevValue,
      [value.target.id]: value.target.value,
    }));
  };

  const handleEditUser = () => {
    Axios.put('http://localhost:3001/edit', {
        id: values.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role
    });
    refreshPage();
    props.setOpen(false);
  };

  const handleClickOpen = () => {
    props.setOpen(true);
  };
  const handleDeleteUser = () => {
    Axios.delete(`http://localhost:3001/delete/${props.id}`)
    refreshPage();
    props.setOpen(false);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }


  return (
    <div>
      <EditIcon color="primary" onClick={handleClickOpen}/>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            color="error"
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.name}
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
            defaultValue={props.email}
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
            defaultValue={props.phone}
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
            defaultValue={props.role}
            type="text"
            fullWidth
            autoComplete="off"
            onChange={handleChangeValues}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDeleteUser}>
                <DeleteIcon color="error"/>
            </Button>
            <Button color="error" onClick={handleClose}>Cancelar</Button>
            <Button color="success" onClick={handleEditUser}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
