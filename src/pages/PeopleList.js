import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
let pejApiUrlVar = 'https://swapi.dev/api/people/?page='

const PeopleListFnc = () => {
  const NavVap = useNavigate()
  const [namAryVar, setNamAryVaf] = useState({})
  let [pejNumAryVar, setPejNumAryVaf] = useState([])
  const [currentPej, setCurrentPej] = useState(1)

  const GetDataFnc = () => {
    fetch(`${pejApiUrlVar}${currentPej}`)
      .then((ResRsgVar) => ResRsgVar.json())
      .then((JsnRsgVar) => {
        console.log(JsnRsgVar)
        setNamAryVaf(JsnRsgVar)
        let maxPejNum = Math.ceil(JsnRsgVar.count / 10)
        pejNumAryVar = []
        for (let i = 1; i <= maxPejNum; i++) {
          pejNumAryVar.push(i)
        }
        setPejNumAryVaf([...pejNumAryVar])
      })
      .catch((ErrRsgVar) => console.log(ErrRsgVar))
  }
  useEffect(() => {
    GetDataFnc()
  }, [currentPej])

  const GoToPrevPejFnc = () => {
    if (currentPej > 1) setCurrentPej(currentPej - 1)
  }

  const GoToNextPejFnc = () => {
    if (currentPej < pejNumAryVar.length) setCurrentPej(currentPej + 1)
  }

  const OnPejChangeFnc = (PejNum) => {
    setCurrentPej(PejNum)
  }

  const GoToDetailPejFnc = (PplItm) => {
    let PplUrlAryVar = PplItm.url?.split('/')
    console.log(PplUrlAryVar)
    let PplUidVar = PplUrlAryVar[PplUrlAryVar.length - 2]
    console.log(PplUidVar)
    NavVap(`/people/${PplUidVar}`)
  }

  return (
    <>
      <h1>People Lists</h1>
      <ul>
        {namAryVar.results?.map((ItmVar) => (
          <li key={ItmVar.name} className='page-item'>
            <a onClick={() => GoToDetailPejFnc(ItmVar)}>{ItmVar.name}</a>
          </li>
        ))}
      </ul>
      <div className='container'>
        {currentPej > 1 && (
          <button className='btn-cls' type='button' onClick={GoToPrevPejFnc}>
            Previous
          </button>
        )}
        {pejNumAryVar.map((PejNum) => (
          <li key={PejNum}>
            <a
              onClick={() => OnPejChangeFnc(PejNum)}
              className={`pej-btn-cls ${
                currentPej === PejNum ? 'active' : ''
              } `}
            >
              {PejNum}
            </a>
          </li>
        ))}

        {currentPej < pejNumAryVar.length && (
          <button className='btn-cls' type='button' onClick={GoToNextPejFnc}>
            Next
          </button>
        )}
      </div>
    </>
  )
}

export default PeopleListFnc
