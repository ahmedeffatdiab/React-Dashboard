import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer'; // Fix name conflict
import {
  IconButton,
  useTheme,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useAuth } from '../Context/AuthContext';
import useCheckAdmin from '../utils/checkAdmin';

const Array1 = [
  { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/" },
  { text: "Manage Team", icon: <PeopleOutlinedIcon />, path: "/team" },
  { text: "Contacts Information", icon: <ContactsOutlinedIcon />, path: "/contacts" },
];

const Array2 = [
  { text: "Profile Form", icon: <PersonOutlinedIcon />, path: "/form" },
  { text: "Calendar", icon: <CalendarTodayOutlinedIcon />, path: "/calendar" },
  { text: "FAQ Page", icon: <HelpOutlineOutlinedIcon />, path: "/faq" },
];

const Array3 = [
  { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/bar" },
  { text: "Pie Chart", icon: <PieChartOutlineOutlinedIcon />, path: "/pie" },
  { text: "Line Chart", icon: <TimelineOutlinedIcon />, path: "/line" },
  { text: "Geography Chart", icon: <MapOutlinedIcon />, path: "/geography" },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideBar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const isAdmin = useCheckAdmin();
  return (
    <div>
      <CustomDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton aria-label="Burger Button" onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Avatar
          sx={{
            mx: "auto",
            width: open ? 88 : 44,
            height: open ? 88 : 44,
            my: 1,
            border: "2px solid grey",
            transition: "0.25s",
          }}
        />

         <Typography sx={{ textAlign: 'center', fontSize: open ? 14 : 0, transition: "0.25s" }}>
                {currentUser ? currentUser?.email : 'None'}
            </Typography>

            <Typography sx={{ textAlign: 'center', mt: 1, fontSize: open ? 15 : 0, transition: "0.25s", color: theme.palette.info.main, }}>
                {isAdmin ? "Admin" : 'User'}
            </Typography>

        <Divider />

        {[Array1, Array2, Array3].map((menu, index) => (
          <List key={index}>
            {menu.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
                <Tooltip title={open ? null : item.text} placement="left">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      bgcolor:
                        location.pathname === item.path
                          ? theme.palette.mode === "dark"
                            ? grey[800]
                            : grey[300]
                          : null,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        ))}

      </CustomDrawer>
    </div>
  );
};

export default SideBar;
