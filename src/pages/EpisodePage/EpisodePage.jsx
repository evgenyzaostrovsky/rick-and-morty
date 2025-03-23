import s from './EpisodePage.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
export const EpisodePage = () => {
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
        fetchData(`https://rickandmortyapi.com/api/episode/?name=${value}`)



    }
    const previousPageHandler = () => {
        fetchData(info.prev)
    }
    const nextPageHandler = () => {
        fetchData(info.next)
    }
    useEffect(() => {
        fetchData('https://rickandmortyapi.com/api/episode')
    }, []);


    return (
        <div className='pageContainer'>
            <h1 className={'pageTitle'}>EpisodePage</h1>
            <input type="search" className={s.search} onChange={searchHandler} placeholder="Search..." />

            {error && <div className="errorMessage">{error} <br></br>
                Hello, Burov! You find it!</div>}
            {!error && location.length && (
                <ul>

                    {location.map( loc => {
                        return (
                            <div key={loc.id} className={s.location}>
                                <li>Эпизод: <b>{loc.episode}</b></li>
                                <li>Название эпизода: <b>{loc.name}</b></li>
                                <li>Дата выхода эпизода в эфир: <b>{loc.air_date}</b></li>
                                <li>Список персонажен, которые были замечены в эпизоде: <b>{loc.characters.length}</b></li>
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

