import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import AddFormDialog from './components/dialog/addFormDialog';
import EditFormDialog from './components/dialog/editFormDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import background from './assets/mm-xicoria.jpg';
import IconButton from '@mui/material/IconButton';




function App() {
  const [listUsers, setListUsers] = useState();
  const [open, setOpen] = React.useState(false);
  

  useEffect(() => {
    Axios.get('http://localhost:3001/').then((response) =>{
      setListUsers(response.data);
    });
  },[]);

  return (
    <div style={{ 
      backgroundImage: `url(${background})`,
      height:`100vh`,
      backgroundPosition:`center`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
      }}>
      <div style={{
        width:'800px',
      }}> 
      <TableContainer component={Paper}>
        <Table sx={{ width: 800}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Cargo</TableCell>
              <TableCell align="center">
                <IconButton>
                  <AddFormDialog open={open} setOpen={setOpen}/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          {typeof listUsers !== 'undefined' && listUsers.map((value) => {
              console.log(value);
              return(
                  <TableBody>
                      <TableRow
                        key={value.id_users}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{value.id_users}</TableCell>
                        <TableCell align="center">{value.name}</TableCell>
                        <TableCell align="center">{value.email}</TableCell>
                        <TableCell align="center">{value.phone}</TableCell>
                        <TableCell align="center">{value.role}</TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <EditFormDialog open={open} setOpen={setOpen} id={value.id_users} name={value.name} email={value.email} phone={value.phone} role={value.role}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                  
            );
          })};
        </Table>
      </TableContainer>
      </div>
    </div>
    
  );
}

export default App;
