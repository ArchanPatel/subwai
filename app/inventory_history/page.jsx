import InventoryHistory from '../../components/inventory-history';
import BackButton from '@components/BackButton';

const InventoryHistoryPage = () => {
    return (
        <div className="container">
            <div className="backButtonContainer">
                <BackButton />
            </div>
            <div className="contentContainer">
                <InventoryHistory/>
            </div>
        </div>
    );
};

export default InventoryHistoryPage;