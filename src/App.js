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

import { constructWheelArray } from './function'
import EmailPage from './EmailPage';
import ChartPage from './ChartPage';

import './styles.css'

export default function App () {
    const [wheelElements, setWheelElements] = useState([]);
    const [tableValues, setTableValues] = useState([]);
    
    const wheelCollectionRef = collection(db, 'wheel_elements')
    const tableCollectionRef = collection(db, 'table_values')

    useEffect(() => {
      console.log("GALLL")
      getTableData()
    }, []);

    const getTableData = async() => {
      let data = await getDocs(tableCollectionRef);
      console.log("Table elements")
      console.log(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
      setTableValues(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
      var wheelArray = constructWheelArray(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
      setWheelElements(wheelArray)
      console.log("table values")
      console.log(tableValues)
    }

    return (
      <Router>
        <html translate="no">
        <div className="App">
          <Routes>
            <Route path="/" element={<AdminPage getTableData={getTableData} wheelElements={wheelElements} setWheelElements={setWheelElements} tableValues={tableValues} setTableValues={setTableValues} tableCollectionRef={tableCollectionRef} wheelCollectionRef={wheelCollectionRef}/>}/>
            <Route path="/spin" element={<SpinPage wheelElements={wheelElements}/>}/>
            <Route path="/emails" element={<EmailPage></EmailPage>}/>
            <Route path="/chart" element={<ChartPage></ChartPage>}/>
          </Routes>
        </div>
        </html>
      </Router>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
