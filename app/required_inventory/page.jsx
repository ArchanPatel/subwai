import RequiredInventoryTable from '../../components/RequiredInventoryTable';
import BackButton from '@components/BackButton';

const RequiredInventoryPage = () => {
    return (
        <div>
            <BackButton />
            {/* Other content */}
            <RequiredInventoryTable />
        </div>
    );
};

export default RequiredInventoryPage;