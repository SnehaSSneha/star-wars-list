import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

let pejApiUrlVar = 'https://swapi.dev/api/people/'

export default function PeopleDetailFnc() {
  let { id } = useParams()

  let [peopleInfo, setPeopleInfo] = useState()
  let [filmAryVar, setFilmAryVaf] = useState([])

  useEffect(() => {
    getUsrDtlFnc()
  }, [])
  const getUsrDtlFnc = async () => {
    let ResRsgVar = await fetch(`${pejApiUrlVar}${id}`)
    let JsnRsgVar = await ResRsgVar.json()
    setPeopleInfo(JsnRsgVar)
    let films = JsnRsgVar.films
    films.forEach((url) => getFilmInfoFnc(url))
  }

  const getFilmInfoFnc = async (url) => {
    let ResRsgVar = await fetch(url)
    let JsnRsgVar = await ResRsgVar.json()
    setFilmAryVaf([...filmAryVar, JsnRsgVar])
  }
  return (
    <div>
      {peopleInfo ? (
        <>
          <h1>People Detail</h1>
          <table>
            <tr>
              <th>Name</th>
              <td>{peopleInfo.name}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{peopleInfo.height}</td>
            </tr>
            <tr>
              <th>Mass</th>
              <td>{peopleInfo.mass}</td>
            </tr>
            <tr>
              <th>Hair Color</th>
              <td>{peopleInfo.hair_color}</td>
            </tr>
            <tr>
              <th>Eye Color</th>
              <td>{peopleInfo.eye_color}</td>
            </tr>
            <tr>
              <th>Birth Year</th>
              <td>{peopleInfo.birth_year}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{peopleInfo.gender}</td>
            </tr>
            <tr>
              <th>Films</th>
              <td>
                <ol>
                  {filmAryVar.map((film) => (
                    <li key={film.episode_id}>{film.title}</li>
                  ))}
                </ol>
              </td>
            </tr>
          </table>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
