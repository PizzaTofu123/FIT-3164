import React, {useEffect, useState} from 'react'


function App() {
  const [backendData, setBackendData] = useState([{}])
 //getting data from backend and setting it into the backendData variable
  useEffect (() => {
  fetch('/api').then(
    response => response.json()
  ).then(
    data => {setBackendData(data)}
  )
 }, []) // only runs in the first render of the component
  return (
    <div>
    
    {
      /*
    (typeof backendData.user == "undefined") ? (
      <p>Loading</p>
    ): (
      backendData.user.map((u, i) => (<p key = {i}>{u}</p>))
    )*/

    backendData.map((dataObj, index) => {
        return (
          <p style={{ fontSize: 20, color: 'black' }}>{dataObj.firstName}</p>
        );
      })
    }
    </div>
  )
}

export default App