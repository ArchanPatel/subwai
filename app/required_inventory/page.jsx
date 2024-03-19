import RequiredInventoryTable from '../../components/RequiredInventoryTable';
import BackButton from '@components/BackButton';

const RequiredInventoryPage = () => {
    return (
        <div className="container">
            <div className="backButtonContainer">
                <BackButton />
            </div>
            <div className="contentContainer">
                <RequiredInventoryTable/>
            </div>
        </div>
    );
};

export default RequiredInventoryPage;