import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Wheel from './Wheel';
import OptionTable from './OptionTable'
import SpinPage from './SpinPage';
import {db} from './firebase-config'

import './styles.css';
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore'
import { getAllByRole } from '@testing-library/react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';

export default function App () {
    // const [wheelElements, setWheelElements] = useState(['Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas']);
    const [wheelElements, setWheelElements] = useState([]);

    const [tableValues, setTableValues] = useState([]);
    const wheelCollectionRef = collection(db, 'wheel_elements')
    const tableCollectionRef = collection(db, 'table_values')
    // console.log(wheelElements)

    useEffect(() => {
      const getWheelData = async () => {
        let data = await getDocs(wheelCollectionRef);
        console.log("gae 2")
        console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setWheelElements(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        console.log("wheel values")
        console.log(wheelElements)
      }

      const getTableData = async() => {
        let data = await getDocs(tableCollectionRef);
        console.log("Table elements")
        setTableValues(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        console.log(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        console.log("table values")
        console.log(tableValues)
      }

      getWheelData();
      getTableData();
    }, []);

    return (
      <Router>
        <html translate="no">
        <div className="App">
          <Routes>
            <Route path="/" element={<AdminPage wheelElements={wheelElements} setWheelElements={setWheelElements} tableValues={tableValues} setTableValues={setTableValues} tableCollectionRef={tableCollectionRef} wheelCollectionRef={wheelCollectionRef}/>}/>
            <Route path="/spin" element={<SpinPage wheelElements={wheelElements}/>}/>
          </Routes>
        </div>
        </html>
      </Router>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
