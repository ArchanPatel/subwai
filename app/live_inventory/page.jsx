import InventoryTable from '../../components/InventoryTable';
import BackButton from '@components/BackButton';
const InventoryPage = () => {
    return (
        <div>
             <BackButton />
            {/* Other content */}
            <InventoryTable />
        </div>
    );
};

export default InventoryPage;