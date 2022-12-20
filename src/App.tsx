import './App.css';
import {useQuery , gql} from '@apollo/client';
import { useEffect } from 'react';


const GET_DATA = 
gql`{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    launch_site {
      site_name_long
      }
    }
  }`;


function  App() {
  const {loading , error , data} = useQuery(GET_DATA);
  useEffect(()=>{
    console.log(loading , error , data);
  });


  return (
    <div className="App">
      <p>hello world</p>
    </div>
  );
}

export default App;
