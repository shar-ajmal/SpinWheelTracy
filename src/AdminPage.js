import Wheel from './Wheel';
import OptionTable from './OptionTable'

export default function AdminPage({wheelElements, setWheelElements, tableValues, setTableValues, tableCollectionRef, wheelCollectionRef}) {
    return (
        <div>
            <Wheel items={wheelElements}/>
            <OptionTable wheelElements={wheelElements} setWheelElements={setWheelElements} tableValues={tableValues} setTableValues={setTableValues} tableCollectionRef={tableCollectionRef} wheelCollectionRef={wheelCollectionRef}/>
        </div>
    );
}
