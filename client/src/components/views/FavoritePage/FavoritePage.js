import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd';
import axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        FetchFavoritedmovie()
    }, [])

    const FetchFavoritedmovie = () => {
        axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId') }) 
        .then(response => {
            if(response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert("유저의 영화정보를 가져오지 못했습니다.")
            }
        })
    }


    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId: movieId,
            userFrom: userFrom
        }
        
        axios.post('/api/favorite/removeFromFavorite', variables)
            .then((response) => {
                if(response.data.success) {
                    FetchFavoritedmovie()
                } else {
                    alert("삭제하는데 실패했습니다.")
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />  : 'no image'}
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRuntime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom) }>Remove</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>

        </div>
    )
}

export default FavoritePage