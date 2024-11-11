import { useState } from 'react'
import '@mantine/core/styles.css';
import './App.css'
import { Grid, Group, MantineProvider, Title } from '@mantine/core';
import Tabla from './Components/Tabla';

function App() {
  return (   
  <MantineProvider>
    
    <Title order={1}>Malla Curricular ICINF Plan Nuevo</Title>
    <Tabla/>
    <footer style={{
      marginTop: '20px',
      textAlign: 'left',
      fontSize: '14px',
      color: '#000000'
    }}>
      © 2024-Martin Hernandez



    </footer>
    
  </MantineProvider>
  );
}

export default App
