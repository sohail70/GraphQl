import { useState } from "react";

export type AppProps = {
    customerId: number;
}
export default function AddOrder({customerId}: AppProps){
    const [active , setActive] = useState(false); //false ro bezari type infer mishe vali age nazari setAcive(true) dar paeen error mide
    const [description , setDescription] = useState('');
    const [cost , setCost] = useState<number>(NaN);
    return (
        <div>
            {active ? null : <button onClick={(e)=>{ // ta vaghti roye button e new Order click kardi mahv beshe
                setActive(true)
            }}>+ New Order</button> }

            {active ? 
            <div> 
                <form onSubmit={(e)=>{
                    e.preventDefault(); // Prevent a page refresh after submit
                    console.log(customerId , description , cost);
                    }}>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input id="description" type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="cost">Cost: </label>
                        <input id="cost" type="text" value={isNaN(cost) ? '' : cost} onChange={(e)=>{setCost(parseFloat(e.target.value))}}/>
                    </div>
                    <br />
                    {/* <button disabled={createCustomerLoading ? true : false}>Add Customer</button>
                    {createCustomerError ? <p>Error Creating Customer</p> : null} */}
                    <button>+Add Order</button>
                    </form>
                
                </div>: null}
        </div>
    );
}