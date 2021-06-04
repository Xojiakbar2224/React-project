import {GrMenu} from "react-icons/gr";
import { useState,useEffect } from "react";
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import clip from "text-clipper"
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const Admin = () => {

    const classes = useStyles();  
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const [openSnack, setOpenSnack] = useState(false);
    const [open, setOpen] = useState(false);
    const [style, setStyle] = useState('w-100');
    const [datas, setDatas] = useState()
    const [modalItem, setmodalItem] = useState()
    
    const handleOpen = (item) => {
        setOpen(true)
        setmodalItem(item)
    };
    const getStatus=(id)=>{
        setOpen(false)
         axios.put(`http://localhost:5000/question/${id}`,{...modalItem,status:true})
        .then(res=>console.log("ad",res.data))
        .catch(err=>console.log("errorr",err))
  
    }
    const onClosed=(id)=>{
            setOpen(!open);
              deleteStore(id);
            setOpenSnack(true)
        };
    const deleteStore = (id)=>{
             axios.delete(`http://localhost:5000/question/${id}`)
            .then(res=>{
               const newData=datas.filter((item)=>{
                if(item.id!==id){
                    return item;
                }
               })
               setDatas(newData)
            })
          }
          useEffect(() => {  
          const  FetchData = ()=>{
             axios.get("http://localhost:5000/question")
            .then(res=>{
                const querys=res.data.filter((item)=>{
                    if(item.status!==true){
                        // window.location.reload(false)
                        return item
                    }
                });
                setDatas(querys) 
            })
        }
        FetchData()
        
    },[])

return (  
    <>
     <div className="d-flex bg-light" style={{justifyContent:"space-between!important"}} >
       
         <div className={`${style}`} >
        {/* navbar material ui */}
        <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Dashboard
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={12} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              className="mr-4"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

    </div>

              {/* questions list for check admin */}
                <div className="container-fluid mr-0 text-white " style={{height:"auto"}}>
                    <div className="container  mb-5">
                        <Snackbar
                            open={openSnack}
                            autoHideDuration={3000}
                            message="This question deleted"
                            onClose={()=>setOpenSnack(false)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            action={
                                <>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setOpenSnack(false)}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </>}/>
                    { datas && datas.map((item,index)=>(
                      !item.status && <div key={index} >
                        <div className="w-75 m-auto border-bottom d-flex px-4 py-3"  style={{backgroundColor:"#BABAFF"}}>
                            <h2 >{item.id}.</h2>
                         <div className="w-100 p-1 m-auto">
                            <p className=" m-2 p-1 col-md-12">
                                {clip(item.title ,50 )}
                        </p>
                            <Chip label={item.tags}color="primary"/>
                        </div>
                            <Button color="secondary" onClick={()=>handleOpen(item)}><VisibilityIcon/></Button>
                        </div>
                    </div>  ))}
                        {modalItem && <div>
                                <Dialog
                                    open={open}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description">
                                  <DialogTitle id="alert-dialog-title" style={{overflowWrap: "break-word"}}>{
                                    modalItem.title}
                                  </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                {modalItem.query}
                                            </DialogContentText>
                                        </DialogContent>
                                        
                                        <DialogActions>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                onClick={()=>onClosed(modalItem.id)}
                                                startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>getStatus(modalItem.id)}
                                                className={classes.button}
                                                endIcon={<Icon>send</Icon>}>
                                                    send
                                                {/* <Button 
                                                onClick={('success')}>
                                                    Show success snackbar
                                                </Button> */}
                                            </Button>
                                        </DialogActions>
                                </Dialog>
                            </div>
                          }
                     </div>
                </div>
                
              
            </div>
         </div>
    </>
    );
}
 
export default Admin;