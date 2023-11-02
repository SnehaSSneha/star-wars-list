import React, { useState, useEffect } from 'react'

const StarWarsFnc = () => {
  const [namAryVar, setNamAryVaf] = useState({})
  const [pstPejVar, setPstPejVaf] = useState(
    'https://swapi.dev/api/people/?page=1'
  )
  const [prvPejVar, setPrvPejVaf] = useState('')
  const [nxtPejVar, setNxtPejVaf] = useState('')
  const [maxPejNum, setMaxPejNumVaf] = useState('')
  let [pejNumAryVar, setPejNumAryVaf] = useState([])

  const GetDataFnc = () => {
    fetch(pstPejVar)
      .then((ResRsgVar) => ResRsgVar.json())
      .then((JsnRsgVar) => {
        console.log(JsnRsgVar)
        console.log(JsnRsgVar.count)
        setNamAryVaf(JsnRsgVar)
        let maxPejNum = Math.ceil(JsnRsgVar.count / 10)
        pejNumAryVar = []
        for (let i = 1; i <= maxPejNum; i++) {
          pejNumAryVar.push(i)
        }
        setPejNumAryVaf([...pejNumAryVar])
        setMaxPejNumVaf(maxPejNum)
      })
      .catch((ErrRsgVar) => console.log(ErrRsgVar))
  }
  useEffect(() => {
    GetDataFnc()
  }, [pstPejVar])
  // console.log(namAryVar)
  // console.log(namAryVar.results)

  useEffect(() => {
    setPrvPejVaf(namAryVar.previous)
    setMaxPejNumVaf(maxPejNum)
    setNxtPejVaf(namAryVar.next)
  }, [namAryVar])

  const GoToPrevPageFnc = () => {
    setPstPejVaf(prvPejVar)
  }

  const GoToNextPageFnc = () => {
    setPstPejVaf(nxtPejVar)
  }

  return (
    <>
      <h1>Star Wars Lists</h1>
      <ul>
        {namAryVar.results?.map((ItmVar) => (
          <li key={ItmVar.name}>{ItmVar.name}</li>
        ))}
      </ul>
      <div class='container'>
        {prvPejVar && (
          <button className='btn-cls' type='button' onClick={GoToPrevPageFnc}>
            Prev
          </button>
        )}
        {pejNumAryVar.map((PejNum) => (
          <a className='pej-btn-cls'>{PejNum}</a>
        ))}
        <p>{pstPejVar.slice(-1)}</p>
        {nxtPejVar && (
          <button className='btn-cls' type='button' onClick={GoToNextPageFnc}>
            Next
          </button>
        )}
      </div>
    </>
  )
}

export default StarWarsFnc
