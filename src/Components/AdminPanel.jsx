// import { NavLink } from "react-router-dom";
// import "./Adminpanel.css";
// import { PopupState } from "mui"

// export default function AdminPanel() {
//   return
// <div className="Admin-panel-box">{[
//   { name: "Product Management", link: "/admin/product-management" },
//   { name: "Order Management", link: "/admin/order-management" },
//   { name: "Video Management", link: "/admin/video-management" },
// ].map(({ name, link }) => (
//   <div key={name}>
//     <NavLink to={link} style={{color: "black", textDecoration: "none", margin: "10px"}}>{name}</NavLink>
//     {/* <hr /> */}
//   </div>
// ))}</div>
// }
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router";

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Admin
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                navigate("/admin/product-management");
                popupState.close();
              }}
            >
              Products
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/order-management");
                popupState.close();
              }}
            >
              Orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/admin/video-management");
                popupState.close();
              }}
            >
              Videos
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
