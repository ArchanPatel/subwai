"use client";

import SuggestedOrderTable from '../../components/SuggestedOrderTable';
import BackButton from '@components/BackButton';

const SuggestedOrderPage = () => {
    return (
        <div className="container">
            <div className="backButtonContainer">
                <BackButton />
            </div>
            <div className="contentContainer">
            <SuggestedOrderTable />
            </div>
        </div>
    );
};

export default SuggestedOrderPage;