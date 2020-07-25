import React from 'react';
import './App.css';
import {
  Card,
  Text,
  Loader,
  Button,
} from '@mrshmllw/smores-react';

const App = () => (
  <>
    <Card >
      <Text tag='h1' typo='header'>Hello World</Text>
      <Loader height='20' /><br/>
      <Button color="pink">Click Me!</Button>
    </Card>
  </>
);

export default App;
