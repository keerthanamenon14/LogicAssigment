import React from 'react';
import {OutlinedInput,InputAdornment} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';

const InputStyle = {
    maxHeight: '40px',
    minWidth: '300px'
}

function SearchBar({data, setFilter}) {
  return (
    <div>
        <OutlinedInput
            sx={{...InputStyle}}
            id="outlined-adornment-weight"
            onChange={(event) => setFilter(event.target.value)}
            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='Search by Bundle Name,Items..'
        />
    </div>
  )
}

export default SearchBar