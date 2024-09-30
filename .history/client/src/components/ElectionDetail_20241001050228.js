const ElectionDetail = ({ clubName, pollingStatus, pollingOpenDate, closingDate, voteStatus }) => {
  const isPollingOpen = pollingStatus === 'open';
  const isPollingClosed = pollingStatus === 'closed';
  const isPollingNotStarted = pollingStatus === 'not_started';
  const navigate = useNavigate();

  const handleVoteClick = () => {
    if (isPollingOpen && !voteStatus) {
      navigate(`/vote/${clubName}`);  // Navigate to Vote page
    }
  };

  const handleViewPreferencesClick = () => {
    if (voteStatus) {
      navigate(`/preferences/${clubName}`);  // Navigate to Preferences page
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
          Polling Closes
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
        {/* Conditional rendering for the buttons */}
        {isPollingOpen && !voteStatus && (
          <button className="btn-vote" onClick={handleVoteClick}>
            Vote Now
          </button>
        )}
        {voteStatus && (
          <button className="btn-preferences" onClick={handleViewPreferencesClick}>
            View Preferences
          </button>
        )}
        {isPollingClosed && (
          <button className="btn-view-results" onClick={handleViewResultsClick}>
            View Results
          </button>
        )}
      </div>
    </div>
