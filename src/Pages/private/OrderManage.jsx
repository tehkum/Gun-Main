// import { useState } from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useContext } from "react";
import "./ProductManage.css";
import { useProducts } from "../../Context/ProductProvider";
import AdminPanel from "../../Components/AdminPanel";

export default function OrderManage() {
  const { orderNo } = useContext(useProducts);

  const rows = orderNo.map((orders) =>
    createData(
      orders.fullName,
      orders.phoneNo,
      `${orders.address1}--${orders.address2}--${orders.pincode}--${orders.city}--${orders.country}`,
      1
    )
  );

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  return (
    <>
      <AdminPanel />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
// <div>
//   <div className="product-display">
//     <ul>{
//         orderNo?.map(items=>{
//          const { _id, } = items;
//          return <li key={_id}>
//           <div></div>
//          </li>
//         })
//     }</ul>
// </div>
// </div>
