import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { Dialog,Button,InputAdornment,Input,MenuItem } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {createUseStyles} from 'react-jss'

const style = {
    position:'absolute !important', 
    top:'0 !important', 
    right:'0 !important', 
    width:'40%',
    left: 'unset',
    '& .MuiDialog-paper':{
        margin: 0,
        padding: '25px',
        width: '100%',
        height: '100%',
        maxHeight: 'unset'
    }
};

const useStyles = createUseStyles({
    fieldStyle: {
        marginBottom:'5px',
        fontSize: '12px',
        fontWeight: '500',
        color: '#75797d'
    },
    inputFieldStyle:{
        border: '1px solid grey',
        borderRadius: '5px',
        minHeight: '25px'
    },
    errorMsg:{
        fontSize: '10px',
        padding: '0px !important',
        color: 'red'
    },
    btnContainer:{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        marginTop: '15px'
    },
    cancelBtn:{
        color:'grey',
        padding: '5px 20px',
        border:'1px solid grey',
        textTransform: 'capitalize',
    },
    actionBtn:{
        padding: '5px 20px',
        marginLeft: '10px',
        textTransform: 'capitalize',
        color: '#ffffff',
        backgroundColor: '#a134eb',
        '&:hover':{
            backgroundColor: '#a134eb', 
        }
    }
})
function FormData({ open, data ,close, title, getBackNewdata}) {
    const classes = useStyles()
    const [incharge, setIncharge] = useState(data.godown4)
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

    const onSubmit = values => {
        getBackNewdata({...values,godown4:incharge});
        close();
    };

    const handleChange = (event) =>{
        setIncharge(event.target.value)
    }

    return (
        <Dialog open={open} maxWidth="md" fullWidth={true} sx={{...style}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <h2>{title}</h2>
                    <CloseIcon style={{cursor:'pointer'}} onClick={close}/>
                </div>
                <div style={{display: 'flex', flexDirection:'column'}}>
                <span className={classes.fieldStyle}>Godown name</span>
                <Input className={classes.inputFieldStyle} defaultValue={data.godown2} {...register("godown2", { required: "Godown name is required" })} />
                <ErrorMessage
                    errors={errors}
                    name="godown2"
                    render={({ message }) => <p className={classes.errorMsg}>Godown name is required</p>
                    }
                />
                <span className={classes.fieldStyle}>Godown Location</span>
                <Input className={classes.inputFieldStyle} style={{minHeight: '50px'}} defaultValue={data.godown3}  {...register("godown3", { required: "Location is required" })} />
                <ErrorMessage
                    errors={errors}
                    name="godown3"
                    render={({ message }) => <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                <span className={classes.fieldStyle}>State</span>
                <Input className={classes.inputFieldStyle} defaultValue={data.state}  {...register("state", { required: "State is required" })} />
                <ErrorMessage
                    errors={errors}
                    name="state"
                    render={({ message }) => <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                <span className={classes.fieldStyle}>Zip Code</span>
                <Input className={classes.inputFieldStyle} defaultValue={data.zipCode}  {...register("zipCode", {required: "Zip Code is required",pattern: {value: /^[1-9][0-9]{5}$/,message: "Invalid Zip Code"}})} />
                <ErrorMessage
                    errors={errors}
                    name="zipCode"
                    render={({ message }) => <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                <span className={classes.fieldStyle}>GSTIN</span>
                <Input className={classes.inputFieldStyle} defaultValue={data.gstin}  {...register("gstin", { required: "GSTIN is required",pattern: {value: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,message: "Invalid GSTIN Number" }})} />
                <ErrorMessage
                    errors={errors}
                    name="gstin"
                    render={({ message }) => <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                <span className={classes.fieldStyle}>Godown Incharge</span>
                <Select className={classes.inputFieldStyle} value={incharge ? incharge : 'Test 2'} onChange={handleChange}>
                    <MenuItem value={incharge}>{incharge}</MenuItem>
                    <MenuItem value={'Test 2'}>Test 2</MenuItem>
                    <MenuItem value={'Test 4'}>Test 4</MenuItem>
                </Select>
                <ErrorMessage
                    errors={errors}
                    name="godown4"
                    render={({ message }) => <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                <span className={classes.fieldStyle}>Phone</span>
                <Input className={classes.inputFieldStyle}  
                    defaultValue={data.phone}  
                    {...register("phone", { required: "Phone number is required",pattern: {value: /^(\+\d{1,3}[- ]?)?\d{10}$/,message: "Invalid Phone Number"} })} 
                    startAdornment={
                        <InputAdornment position="start">
                          <LocalPhoneIcon />
                        </InputAdornment>
                    }
                />
                <ErrorMessage
                    errors={errors}
                    name="phone"
                    render={({ message }) => <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                <span className={classes.fieldStyle}>Email</span>
                <Input className={classes.inputFieldStyle}  
                    defaultValue={data.email}  {...register("email", { required: "Email is required" ,pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message: "invalid email address"}})} 
                    startAdornment={
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                    }    
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => 
                    <span className={classes.errorMsg}>
                        {message}
                    </span>
                    }
                />
                </div>
                <div className={classes.btnContainer}>
                    <Button className={classes.cancelBtn} onClick={close}>Cancel</Button>
                    <Button type="submit" value="Create" className={classes.actionBtn}>Submit</Button>
                </div>
            </form>
        </Dialog>
    )
}

export default FormData