import ResultItem from '../components/ResultItem';

const sampleCandidates = [
  { image: 'https://cdn-icons-png.flaticon.com/128/3884/3884864.png', name: 'Brian Bells', position: 'President', votes: 70 },
  { image: 'https://cdn-icons-png.flaticon.com/128/4892/4892710.png', name: 'Peeta Malarkey', position: 'Vice President', votes: 46 },
  { image: 'https://cdn-icons-png.flaticon.com/128/4329/4329449.png', name: 'Wonyoung Jang', position: 'Secretary', votes: 56 },
  { image: 'https://cdn-icons-png.flaticon.com/128/4829/4829575.png', name: 'Karina Yu', position: 'Treasurer', votes: 50 },
  { image: 'https://cdn-icons-png.flaticon.com/128/3667/3667832.png', name: 'Yoji Daphne', position: 'Events Director', votes: 61 },
  // Add more candidates as needed
];

const Results = () => {
    return (
      <div>
        <h1 className='main-heading'>Elections Results</h1>
        <ResultItem candidates={sampleCandidates} />
      </div>
    );
  };
  
  export default Results;