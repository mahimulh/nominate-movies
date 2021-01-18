/* 
Commands ran at beginning
cd into folder
npx create-react-app nominate-movies
npm install bootstrap
*/
//deleted App.js contents and made a react function with rafce

import React, { useState , useEffect} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import NominateMovie from './components/NominateMovie';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import RemoveNominations from './components/RemoveNominations';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]); //useState object / [] initialized empty array
  const [nominations, setNominations] = useState([]);
  const [searchValue, setSearchValue] = useState(''); //this is to make searching dynamic

  const getMovieRequest = async (searchValue) => {  //getting from URL from movie api
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=eca58be4`;

    const response = await fetch(url); //cannot use await without making function async, so include async to function
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };
  
  useEffect(() => { //call getMovieRequest using useEffect
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieNominations = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
      );
    if(movieNominations){
      setNominations(movieNominations);
    }
  }, []);

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  }

  const addNominatedMovie = (movie) => {
    if(nominations.length < 5){ //limit total movies to 5
      if(!nominations.includes(movie)) { //if it already exists
        const newNominatedList = [...nominations, movie];
        setNominations(newNominatedList);
        saveToLocalStorage(newNominatedList);
      }
    } 
  }

  const removeNominatedMovie = (movie) => {
    const newNominatedList = nominations.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    
    setNominations(newNominatedList);
    saveToLocalStorage(newNominatedList);
  }
  
  return ( 
    <div className = 'container-fluid movie-app'>
      <div>
        { nominations.length === 5 ? 
          <div >
            <h1 className = 'banner'>Max Nominations Reached</h1>
          </div> : null
        }
      </div>
      <div className = 'row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies' />
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}/>
      </div>
      <div className = 'row'>
        <MovieList movies = {movies} handleNominationClick = {addNominatedMovie} NominateComponent = {NominateMovie}/>
      </div>
      <div className = 'row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Nominations' />
      </div>
      <div className = 'row'>
        <MovieList movies = {nominations} handleNominationClick = {removeNominatedMovie} NominateComponent = {RemoveNominations}/>
      </div>
    </div>
  )
}

export default App
