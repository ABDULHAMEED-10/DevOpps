import React, { useState } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MetaData from "../MetaData";
import Divider from '@material-ui/core/Divider';
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@mui/material';
const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', 
    },
    secondary: {
      main: '#F50057',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffc009',
  },
  menuButton: {
    color:'black',
    marginRight: theme.spacing(2),
    zIndex: 2, 
  
  },
  title: {
    flexGrow: 1,
    color: 'Black',
  
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#ffc009',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  listItem: {
    color: 'Black',
    fontWeight: 'bold',
  },
  profilePic: {
    borderRadius: "100px",
    height: "31px",
    width: "30px",
    transition: "transform 0.2s ease-in-out", 
    "&:hover": {
      transform: "scale(1.1)", 
    },
  },
  
 
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
 
  let { isAuthenticated ,user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const classes = useStyles();
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    
  };

  const Logout = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert.success("Logout successfully");
  };
  


  const Post = (e) => {
    e.preventDefault();
    if (user.role === "admin") {
      navigate("/admin/blog/new") 
    }
    else {
      alert.info("Login As Admin To Make Changes")
    }
    
  };


  const drawerContent = (
    <div>
      <div className={classes.drawerHeader}>
      
        
        <IconButton onClick={toggleDrawer}>
        <Tooltip title="Close" arrow>
            <MenuIcon />
          </Tooltip>
            
          </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <ListItemIcon style={{color:"black"}}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" className={classes.listItem} />
        </ListItem>

        <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
          <ListItemIcon style={{color:"black"}}><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" className={classes.listItem} />
        </ListItem>
        <ListItem button component={Link} to="/contact" onClick={toggleDrawer}>
          <ListItemIcon style={{color:"black"}}><ContactMailIcon /></ListItemIcon>
          <ListItemText primary="Contact" className={classes.listItem} />
        </ListItem>
        
      </List>
      <Divider />
      {isAuthenticated ? (
        <div>
          
          <ListItem button onClick={Logout}>
            <ListItemIcon style={{color:"black"}}><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" className={classes.listItem} />
          </ListItem>

          <ListItem button onClick={Post}>
            <ListItemIcon style={{color:"black"}}><AddCircleIcon /></ListItemIcon>
            <ListItemText primary="Post Blog" className={classes.listItem} />
          </ListItem>

            

        
        </div>
      ) : (
       ""
      )}
    </div>
  );

  return (
    
    <ThemeProvider theme={theme}>
      <MetaData title="Home" />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <></>
            </Typography>
            
            
            
           
            
            
            
            {isAuthenticated ? (
             
              <Link to="/me" style={{ borderRadius: "100px", marginBottom: "5px" }}>
                <Tooltip title={user.role ? user.role : "Profile"} arrow>
             <img className={classes.profilePic} src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={user.name} />
                  
                </Tooltip>
                
             
              </Link>
              
          
            ) : (
                <Link to="/login" style={{ borderRadius: "100px", marginBottom: "5px" }}>
                <Tooltip title={"Profile"} arrow>
                  
                    <img className={classes.profilePic} src="/Profile.png" alt="Profile" />
                </Tooltip>
                    
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={toggleDrawer}
        >
          {drawerContent}
        </Drawer>
        
      </div>
    </ThemeProvider>
  );
};

export default Header;
