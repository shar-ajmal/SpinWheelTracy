import Wheel from './Wheel';
import OptionTable from './OptionTable'
import SpinWheel from './SpinWheel';
import Navbar from './Navbar';
export default function AdminPage({getTableData, wheelElements, setWheelElements, tableValues, setTableValues, tableCollectionRef, wheelCollectionRef}) {

    return (
        <div>
            <Navbar></Navbar>
            <SpinWheel wheelElements={wheelElements}/>
            <OptionTable getTableData={getTableData} wheelElements={wheelElements} setWheelElements={setWheelElements} tableValues={tableValues} setTableValues={setTableValues} tableCollectionRef={tableCollectionRef} wheelCollectionRef={wheelCollectionRef}/>
        </div>
    );
}
