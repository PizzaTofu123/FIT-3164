import PreferenceItem from '../components/PreferenceItem';

const sampleCandidates = [
  { image: 'https://cdn-icons-png.flaticon.com/128/3884/3884864.png', name: 'Brian Bells', position: 'President' },
  { image: 'https://cdn-icons-png.flaticon.com/128/4892/4892710.png', name: 'Peeta Malarkey', position: 'Vice President' },
  { image: 'https://cdn-icons-png.flaticon.com/128/4329/4329449.png', name: 'Wonyoung Jang', position: 'Secretary' },
  { image: 'https://cdn-icons-png.flaticon.com/128/4829/4829575.png', name: 'Karina Yu', position: 'Treasurer' },
  { image: 'https://cdn-icons-png.flaticon.com/128/3667/3667832.png', name: 'Yoji Daphne', position: 'Events Director' },
  // Add more candidates as needed
];

const Preferences = () => {
    return (
      <div>
        <h1 className='main-heading'>YOUR CANDIDATE PREFERENCES</h1>
        <PreferenceItem candidates={sampleCandidates} />
      </div>
    );
  };
  
  export default Preferences;
  