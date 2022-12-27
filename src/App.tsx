import './App.css';
import {useQuery, useMutation , gql} from '@apollo/client';
import { useEffect , useState } from 'react';


// export type Launch =  {
//         "mission_name": string,
//         "launch_date_local": string,
//         "launch_site": {
//           "site_name_long": string
//         }
// };

// const GET_DATA = 
// gql`{
//   launchesPast(limit: 10) {
//     mission_name
//     launch_date_local
//     launch_site {
//       site_name_long
//       }
//     }
//   }`;

export type Order ={
  id: number;
  description: string;
  totalInCents: number;
  
}


export type Customer =  {
        id: number;
        name: string;
        industry: string;
        orders: Order[];
    };

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

  // deghat kun String ro ba S bozor benvisi dar paeen
const MUTATE_DATA = gql`
  mutation MUTATE_DATA($name: String! , $industry: String!){ 
    createCustomer(name: $name , industry: $industry){
      customer{
        id
        name
      }
    }
  }
`; //gql`` means its a graph query language string
function  App() {
  const [name , setName] = useState<string>(''); // age empty string bezari  default ro on vaght dar form nizai nist hatman name ro por kuni
  const [industry , setIndustry] = useState<string>(''); // meghdar default komak mikune ke age input ro dar UI por nakardi va mostaghim button e Add customer ro zadi gir nade behet

  const {loading , error , data} = useQuery(GET_DATA);
  const [createCustomer , {loading: createCustomerLoading , error: createCustomerError , data: createCustomerData}] = useMutation(MUTATE_DATA , {refetchQueries:[{query: GET_DATA}]}); // mittoni jaye esme MUTATE_DATA benvisi add_csutomer --> kulan harchi dost dari benvis

  useEffect(()=>{
    console.log(loading , error , data);
    console.log(createCustomerLoading , createCustomerError , createCustomerData); //log kunim bebinim chi tosh hast!
  });


  return (
    <div className="App">
      {/* {data ? data.launchesPast.map((launch: Launch)=>{
          return <p>{launch.mission_name + ' ' + launch.launch_date_local}</p>
        }):null} */}

      {error ? <p>Sth wend wring</p>:null}
      {loading? <p>loading...</p>: null}
      {data ? data.customers.map((customer: Customer)=>{
          return (
            <div>
              <h2 key={customer.id}>{customer.name + ' (' + customer.industry + ')'}</h2>
              {customer.orders.map((order: Order)=>{
                return( 
                <div>
                  <p>{order.description}</p>
                  <p>Cost: ${(order.totalInCents/100).toLocaleString(undefined , {minimumFractionDigits: 2 , maximumFractionDigits: 2})}</p>
                </div>
                );
              })}
            </div>
          )
        }):null}



        <form onSubmit={(e)=>{
          e.preventDefault(); // Prevent a page refresh after submit
          // console.log('submitting' , name , industry);
          createCustomer({ variables: {name: name , industry: industry}}) //name va industry dovom state haye ma hastan
          if(!error){
            setName('');
            setIndustry('');
          }
        }}>
          <div>
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>

          <div>
              <label htmlFor="industry">Industry:</label>
              <input id="industry" type="text" value={industry} onChange={(e)=>{setIndustry(e.target.value)}}/>
          </div>

          <button disabled={createCustomerLoading ? true : false}>Add Customer</button>
          {createCustomerError ? <p>Error Creating Customer</p> : null}

        </form>


    </div>




  );
}

export default App;
