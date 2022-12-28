import { useMutation , gql } from "@apollo/client";
import { useEffect, useState } from "react";



const GET_DATA = 
gql`
  {
    customers {
      id
      name
      industry
      orders{
        id
        description
        totalInCents
      }
    }
  }`;


  // format in chizaee ke paeen minvisim lozoman bar aval daghigh nist va bayad az graphql komak begiri va ye bar ham invoke kunim bebinim ke query moon ro javab mide backend ya na syntax haro eshtebah neveshtim
const MUTATE_DATA = gql`
  mutation MUTATE_DATA($description: String! , $totalInCents: Int! , $customer: ID){
    createOrder(customer: $customer , description: $description , totalInCents: $totalInCents){
        order {
            id
            customer{
                id
            }
            description
            totalInCents
        }
    }
  }
`;


export type AppProps = {
    customerId: number;
}
export default function AddOrder({customerId}: AppProps){
    const [active , setActive] = useState(false); //false ro bezari type infer mishe vali age nazari setAcive(true) dar paeen error mide
    const [description , setDescription] = useState('');
    const [total , setTotal] = useState<number>(NaN);

    const [
        createOrder,
        {
            loading,
            error,
            data,
        },
    ] = useMutation(MUTATE_DATA , {
        refetchQueries: [
            {query: GET_DATA} , 
        ],
    });

    useEffect(()=>{
        if(data){
            console.log(data);
            setDescription('');
            setTotal(NaN);
        }
    } , [data]); // in useEffect vase ine ke age data az backend omad pas yani movafaghiat amiz bode process --> masalan ye typo toye query bala dashte bashee in dg log nemikune
    return (
        <div>
            {active ? null : <button onClick={(e)=>{ // ta vaghti roye button e new Order click kardi mahv beshe
                setActive(true)
            }}>+ New Order</button> }

            {active ? 
            <div> 
                <form onSubmit={(e)=>{
                    e.preventDefault(); // Prevent a page refresh after submit
                    createOrder({
                        variables:{
                            customer: customerId , 
                            description: description,
                            totalInCents: total*100
                        }
                    })
                    }}>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input id="description" type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="total">Total: </label>
                        <input id="total" type="text" value={isNaN(total) ? '' : total} onChange={(e)=>{setTotal(parseFloat(e.target.value))}}/>
                    </div>
                    <br />
                    {/* <button disabled={createCustomerLoading ? true : false}>Add Customer</button>
                    {createCustomerError ? <p>Error Creating Customer</p> : null} */}
                    <button disabled={loading ? true: false}>+Add Order</button>
                    </form>
                    {error ? <p> sth went wrong</p> : null}
                </div>: null}
        </div>
    );
}