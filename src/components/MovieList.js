import React from 'react'

const MovieList = (props) => {
    const NominateComponent  = props.NominateComponent;

    return (
        <>
            {props.movies.map((movie, index) => 
            <div className = 'image-container d-flex justify-content-start m-3'>
                <div  className='overlay-2'>
                    <h6>{movie.Title} ({movie.Year})</h6>
                </div> 
                <img src = {movie.Poster} alt = 'movie'></img>
                <div onClick = {() => props.handleNominationClick(movie)} className = 'overlay d-flex align-items-center justify-content-center'>
                    <NominateComponent />    
                </div> 
            </div>
            )}
        </>
    )
}

export default MovieList
