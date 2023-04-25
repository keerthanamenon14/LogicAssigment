import React , {useState} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Dialog,DialogTitle,DialogActions,Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import {Menu,MenuItem} from '@mui/material/';
import FormData from './components/FormData';
import SearchBar  from './components/SearchBar';
import Stack from '@mui/material/Stack';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    options:{
        color:'#282929'
    }
})

export default function DataTable() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  let dummyId = 4;

  const columns = [
    { field: 'godown1', headerName: 'Godown', width: 100 },
    { field: 'godown2', headerName: 'Godown', width: 200 },
    { field: 'godown3', headerName: 'Godown', width: 130 },
    {
      field: 'state',
      headerName: 'State',
      type: 'number',
      width: 90,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      sortable: false,
      width: 100
    },
    {
      field: 'godown4',
      headerName: 'Godown',
      sortable: false,
      width: 160
    },
    {
      field: 'gstin',
      headerName: 'Godown GSTIN',
      sortable: false,
      width: 160
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: false,
      width: 160
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 160
    },
    {
      field: 'options',
      headerName: '',
      sortable: false,
      width: 80,
      renderCell: (params) => {
        if(params.row.id === 1){
            return null
        }else{return(<MoreHorizIcon options={params.row.options} onClick={(event) => handleOpen(event, params.row)}/>)}
      }
    },
  ];
  
  const [rows, setRows] = useState([
    { id: 1, godown1: 'ID', godown2: 'Name', godown3: 'Location',godown4: 'InCharge'},
    { id: 2, godown1: 'BID001', godown2: 'Main Godown(default)', godown3: 'Palarivattam', state: 'Kerala', zipCode: 187345, godown4: 'test', gstin: '29GGGGG1314R9Z6',phone: '7374859858', email:'testemail@gmail.com',  options: ['Edit', 'Delete']},
    { id: 3, godown1: 'BID002', godown2: 'VIP Road,Kaloor', godown3: 'Vytila', state: 'Kerala', zipCode: 187873, godown4: 'test', gstin: '29GGGGG1314R9Z7',phone: '9789754361', email:'testemail@gmail.com',  options: ['Edit', 'Delete']}
  ]);

  const [copy, setCopy] = useState([...rows]);

  const handleCreateNewGodown = () =>{
    setTitle('Create New Godown')
    setSelectedRow(null)
    setDialogOpen(true)
  }

  const setChangeData = (target) => {
    setAnchorEl(target)
  }

  const handleEdit = () => {
    setTitle('Edit Godown values')
    setDialogOpen(true)
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setDeleteConfirmation(true);
  };

  const deleteRow = () =>{
    setRows(rows.filter(item => item.id != selectedRow.id))
    setCopy(rows.filter(item => item.id != selectedRow.id))
    setDeleteConfirmation(false)
  }

  const handleOpen = (event, row) => {
    setSelectedRow(row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDialog = () =>{
    setDialogOpen(false)
  }

  const setFilter = (searchParam) =>{
    if(searchParam.length > 0){
        let filteredList = copy.filter((item, index) => {
            return (index === 0) || (Object.values(item).some((value) => {
                return value?.toString().toLowerCase().includes(searchParam.toLowerCase());
            }));
        });  
        setRows(filteredList)
    }else{
        setRows(copy)
    }
  }

  const getBackNewdata = (newData) =>{
    let newDataObj;
    if(selectedRow){
        newDataObj = rows.map(item=>{
            if(item.id === selectedRow.id){
                return(
                    {...item,godown2:newData.godown2,godown3:newData.godown3,email:newData.email,phone:newData.phone,zipCode:newData.zipCode,godown4:newData.godown4,gstin:newData.gstin}
                )
            }
            else return item
        })
        setRows(newDataObj)
        setCopy([...newDataObj])
    }
    else{
        newDataObj = {...rows[1],id:'abc',godown2:newData.godown2,godown3:newData.godown3,email:newData.email,phone:newData.phone,zipCode:newData.zipCode,godown4:newData.godown4,gstin:newData.gstin}
        let newArr = [...rows]
        newArr.push(newDataObj)
        console.log(newArr)
        setRows(newArr)
        setCopy([...newArr])
    }
  }

  return (
    <>
    <Stack direction="row" justifyContent="space-between">
        <SearchBar data={rows} setFilter={setFilter}/>
        <Button 
            startIcon={<Add/>} 
            onClick={()=> handleCreateNewGodown()}
            sx={{color:'white',textTransform:'capitalize !important', backgroundColor:'#a134eb','&:hover':{backgroundColor:'#a134eb'}}}
        >
            <span>Create new Godown</span>
        </Button>
    </Stack>
    <div style={{ marginTop: '30px', display: 'flex', width: '100%', justifyContent:'center' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableColumnHeaderSorting
        sx={{
            boxShadow: 2,
            '& .MuiDataGrid-columnHeaders':{
                backgroundColor:'#c1c6c7',
                border: '1px solid grey'
            },
            '& .MuiDatagrid-columnHeaderTitle':{
                fontWeight: 'bold !important'
            },
            '& .MuiDataGrid-row:first-child': { backgroundColor:'#c1c6c7',fontWeight: 'bold'},
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
        }}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}   
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit} className={classes.options}> <Edit/> <span style={{marginLeft:'10px'}}>Edit</span> </MenuItem>
        <MenuItem onClick={handleDelete} className={classes.options}> <Delete/> <span style={{marginLeft:'10px'}}>Delete</span></MenuItem>
      </Menu>
      {dialogOpen && <FormData open={dialogOpen} data={selectedRow ? selectedRow : []} close={closeDialog} title={title} getBackNewdata={getBackNewdata}/>}
      {
        deleteConfirmation && 
        <Dialog open={deleteConfirmation}>
            <DialogTitle>Are you sure you want to delete this godown detail row?</DialogTitle>
            <DialogActions>
                <Button onClick={()=> setDeleteConfirmation(false)}>Cancel</Button>
                <Button onClick={deleteRow}>Proceed</Button>
            </DialogActions>
        </Dialog>
      }
    </div>
    </>
  );
}
