import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import { useParams } from 'react-router-dom'
import MainImage from '../LandingPage/sections/MainImage'
import MovieInfo from './sections/MovieInfo'
import GridCards from '../commons/GridCards'
import Favorite from './sections/Favorite'
import { Row } from 'antd'

function MovieDetail(props) {

    const {movieId} = useParams();

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    let endpointCrew =  `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    useEffect(() => {
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })
        

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })

    }, [])
    
    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }

    return (
        <div>
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />
            <div style={{ width:"85%", margin: "1rem auto" }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite 
                        movieInfo={Movie}
                        movieId={movieId}
                        userFrom={localStorage.getItem('userId')}
                    />
                </div>

                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />
                <br />
                {/* Actor Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null
                                    }
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }

            </div>
        </div>
    )
}

export default MovieDetail