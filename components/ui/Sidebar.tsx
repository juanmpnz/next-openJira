import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from "react";
import { UiContext } from "@/context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send email", "Draft"];
export const Sidebar = () => {

  const {sideMenuOpen,openSideMenu, closeSideMenu} = useContext(UiContext)
   return (
    <Drawer
      onClose={() => closeSideMenu()}

      anchor="left"
      open={sideMenuOpen}
    >
      <Box sx={{ width: 250, padding: 1 }}>
        <Box sx={{ padding: "5px 2px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, i) => (
            <ListItem key={i} >
              <ListItemIcon>
                {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
          {menuItems.map((text, i) => (
            <ListItem key={i} >
              <ListItemIcon>
                {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
