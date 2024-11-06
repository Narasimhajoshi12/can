import React, { useState } from 'react';
import CandidateTable from './components/CandidateTable';
import AddCandidate from './components/AddCandidate';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleCandidateAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Candidate Management</h1>
            <AddCandidate onCandidateAdded={handleCandidateAdded} />
            <CandidateTable refresh={refresh} />
        </div>
    );
};

export default App;