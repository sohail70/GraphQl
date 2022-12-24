import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

let client = new ApolloClient({
  // uri: 'https://api.spacex.land/graphql/',
  uri: 'http://localhost:8000/graphql/', //deghat kun ba uri bala fargh dare chun http hast 
  cache: new InMemoryCache
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
