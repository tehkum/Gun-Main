import { useEffect, useState } from "react";
import CartCard from "../../Components/CartBox";

export default function CheckoutPage(){
    const [ finalPage, setfinalPage ] = useState([])

    useEffect(()=>{
        setfinalPage(JSON.parse(localStorage.getItem("ChekoutData")) ?? [] )
      },[finalPage])

    return <>
        <ul>{
            finalPage.map(item=>{
              const { _id, name, amount } = item;
              return <CartCard key={_id} _id={_id} name={name} amount={amount} />
            })
          }</ul>
    </>
}