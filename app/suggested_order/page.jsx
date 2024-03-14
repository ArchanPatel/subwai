"use client";

import SuggestedOrderTable from '../../components/SuggestedOrderTable';
import BackButton from '@components/BackButton';

const SuggestedOrderPage = () => {
    return (
        <div>
            <BackButton />
            {/* Other content */}
            <SuggestedOrderTable />
        </div>
    );
};

export default SuggestedOrderPage;