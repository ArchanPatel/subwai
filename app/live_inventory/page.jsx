import InventoryTable from '../../components/InventoryTable';
import BackButton from '@components/BackButton';
const InventoryPage = () => {
    return (
        <div className="container">
            <div className="backButtonContainer">
                <BackButton />
            </div>
            <div className="contentContainer">
                {/* Other content */}
                <InventoryTable />
            </div>
        </div>

    );
};

export default InventoryPage;