import React, { useState, useEffect } from 'react';
import './App.css';
import { Text, Loader, Button } from '@mrshmllw/smores-react';
import axios from 'axios';

const API_ENDPOINT = 'https://api.spacexdata.com/v3/';
const getUrl = query => `${API_ENDPOINT}${query}`;

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false)

  const handleFetchData = async event => {
    try {
      const result = await axios.get(getUrl(event.target.value));
      setData(result.data);
    } catch {
      setError(true);
    }
  }
  console.log('Comp: A');
  useEffect(() => {
    handleFetchData()
  }, []);

  return (
    <>
      <Text tag='h1' typo='header'>Hello World</Text>
      <Loader height='20' />

      <br/>

      <button value='rockets' onClick={handleFetchData}>Rockets</button>
      <button value='dragons' onClick={handleFetchData}>Dragons</button>

      {error && <h3>Something went terribly wrong ...</h3>}
      {data &&
        <ul>{data.map(item =>
          <li key={item.id}>
            {item.flickr_images.map((url) => <img src={url} key={url} width='200'/>)}
          </li>)}
        </ul>
      }
    </>
  )
};

export default App;
