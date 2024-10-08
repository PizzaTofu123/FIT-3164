import React from 'react';
import './ElectionDetail.css';
import { useNavigate } from 'react-router-dom';

const ElectionDetail = ({ clubName, pollingStatus, pollingOpenDate, closingDate, voteStatus}) => {
    const isPollingOpen = pollingStatus === 'open';
    const isPollingClosed = pollingStatus === 'closed';
    const isPollingNotStarted = pollingStatus === 'not_started';

    const navigate = useNavigate();

    const handleVoteClick = () => {
        if (isPollingOpen && !voteStatus) {
            navigate(`/vote/${clubName}`);  // Navigate to Vote page
        }
    };

    const handleViewResultsClick = () => {
        if (isPollingClosed) {
            navigate(`/results/${clubName}`);  // Navigate to Results page
        }
    };

    return (
        <div className="election-detail">
            <h2 className="index">{clubName}</h2>
            <div className="election-info">
                <p className={
                    isPollingOpen ? 'polling-open' :
                    isPollingClosed ? 'polling-closed' : 'polling-not-started'}>
                    {isPollingOpen && 'Polling Open'}
                    {isPollingClosed && 'Polling Closed'}
                    {isPollingNotStarted && (
                        <>
                            Polling Opens
                            <br />
                            <span>{pollingOpenDate}</span>
                        </>
                    )}
                </p>
                <p className="closing-date">
                    {isPollingClosed ? 'Polling Closed' : 'Polling Closes'}
                    <br />
                    <span>{closingDate}</span>
                </p>
                <p className="status">
                    Status:
                    <br />
                    <span className={voteStatus ? 'status-voted' : 'status-pending'}>
                        {voteStatus ? 'Voted' : 'Pending'}
                    </span>
                </p>
                <button
                    className={
                        isPollingOpen && !voteStatus ? 'btn-vote' :
                        voteStatus ? 'btn-disabled' : 'btn-disabled'
                    }
                    onClick={handleVoteClick}
                    disabled={voteStatus}  // Disable the button if the user has voted
                >
                    Vote Now
                </button>

                <button
                    className={isPollingClosed ? 'btn-view-results' : 'btn-disabled'}
                    onClick={handleViewResultsClick}
                    disabled={!isPollingClosed}  // Disable if polling is not closed
                >
                    View Results
                </button>
            </div>
        </div>
    );
};

export default ElectionDetail;
