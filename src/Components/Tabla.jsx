import { Group, Stack } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { Table, Button } from '@mantine/core';
import subjectsData from '../subjects.json';

function Tabla() {
  // aqui iran todas las asignaturas en cada uno de los semestres
  const subjectsBySemester = {1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: []}; 
  subjectsData.subjects.forEach((subject) => {
    //recore todo subjects 
    const semester = subject.semester;
    //almacena el numero del semestre
    subjectsBySemester[semester].push(subject.name);
    //mete el ramo a su respectivo semestre
  });

  // identifica la casilla clickeada
  const [clickedCell, setClickedCell] = useState(null);

// esto es para tener los ramos prev y next
 const [prevSubjects, setPrevSubjects] = useState([]);
 const [nextSubjects, setnextSubjects] = useState([]);

// eta vaina para la funcion del click
  const handleCellClick = (semester, rowIndex) => {
    const subject = subjectsBySemester[semester][rowIndex];// aqui  se identifica el ramo clickeado 

   const subjectData = subjectsData.subjects.find(
      (item) => item.name === subject);// esto busca en el json el ramo clikeado

    //PREVIO
    const prevSubjectsList = subjectData ? subjectData.prev : []; // mete al array el ramo previo
    setPrevSubjects(prevSubjectsList);
    // NEXT
    const nextSubjectsList = subjectData ? subjectData.next: [];
    setnextSubjects(nextSubjectsList); // lo mismo pal next
  
    setClickedCell({ semester, rowIndex });// este es para el clickeado
  };

  // Creacion de la tabla
  const rows = Array.from({ length: 7 }).map((_, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {Array.from({ length: 11 }).map((_, semesterIndex) => {
        const subject = subjectsBySemester[semesterIndex + 1]?.[rowIndex] || ''; // llena las filas y si se quieda sin ramos para anadir queda vacio
        const isClicked = clickedCell && clickedCell.semester === semesterIndex+ 1 && clickedCell.rowIndex === rowIndex;

        return (
          <Table.Td
            key={semesterIndex}
            onClick={() => handleCellClick(semesterIndex + 1, rowIndex)}// aqui se aplica la funcion para pintar los ramos con su color a partir del clickeado
            style={{
              cursor: 'pointer',
              backgroundColor: isClicked ? '#f5f576': prevSubjects.includes(subject) ? '#ff5733':nextSubjects.includes(subject)? '#29be46' :'',
              textAlign: 'center',
              border: isClicked ? '3px solid black': '1px solid black'
              //rojo previo, amarillo actual, verde next
            }}
          >
            {subjectsBySemester[semesterIndex + 1]?.[rowIndex] || ''}
          </Table.Td>
        );
      })}
    </Table.Tr>
  ));

  return (
    //los encabezados
    // el textaling de table.thead no sirve, por eso cada semestre lo tiene individual
    <Table>
      <Table.Thead style={{ backgroundColor: '#6cafd5', border: '2px solid black', textAlign: 'center' }}>
        <Table.Tr>
        <Table.Th style={{ textAlign: 'center' }}>Semestre I</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre II</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre III</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre IV</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre V</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre VI</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre VII</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre VIII</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre IX</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre X</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Semestre XI</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody> {rows} </Table.Tbody>
    </Table>
  );
}
export default Tabla;