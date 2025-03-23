import s from './LocationPage.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
export const LocationPage = () => {
    const [location, setLocation] = useState({})
    const [info, setInfo] = useState({
        count: 0,
        pages: 0,
        next: null,
        prev: null,
    })
    const [error, setError] = useState(null)



    const fetchData = (url) => {
        axios.get(url)
            .then( (res) => {
                setLocation(res.data.results)
                setInfo(res.data.info)
                setError(null)
            }).catch ( (err) => {
            setError(err.response.data.error)
        })
    }
    const searchHandler = (event) => {
        const value = event.target.value
        fetchData(`https://rickandmortyapi.com/api/location/?name=${value}`)



    }
    const previousPageHandler = () => {
        fetchData(info.prev)
    }
    const nextPageHandler = () => {
        fetchData(info.next)
    }
    useEffect(() => {
        fetchData('https://rickandmortyapi.com/api/location')
    }, []);


    return (
        <div className='pageContainer'>
            <h1 className={'pageTitle'}>LocationPage</h1>
            <input type="search" className={s.search} onChange={searchHandler} placeholder="Search..." />

            {error && <div className="errorMessage">{error} <br></br>
                Hello, Burov! You find it!</div>}
            {!error && location.length && (
            <ul>

                {location.map( loc => {
                    return (
                        <div key={loc.id} className={s.location}>
                        <li>Название локации: <b>{loc.name}</b></li>
                    <li>Тип локации: <b>{loc.type}</b></li>
                    <li>Измерение, в котором находится местоположение: <b>{loc.dimension}</b></li>
                    <li>Количество персонажей, которых видели в данной локации: <b>{loc.residents.length}</b></li>
                    <hr></hr>
                        </div>
                    )
                })}

            </ul> )}
            <div className={s.buttonContainer} >
                <button className="linkButton" disabled = {info.prev === null} onClick={previousPageHandler}>
                    Назад
                </button>
                <button className="linkButton" disabled = {info.next === null} onClick={nextPageHandler}>
                    Вперед
                </button>
            </div>
        </div>
    )
}

