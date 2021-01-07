import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import $ from '../node_modules/jquery'
// import Popper from '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class MovieData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        search: ''
      },
      movieDetails: {
        foundMovie: null,
        title: null,
        year: null,
        director: null,
        plot: null,
        posterUrl: null,
        errorMessage: null,
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=  this.handleSubmit.bind(this);
  }
  handleChange(e) {
    var key = e.target.getAttribute("name");
    var formState = this.state.formState;
    formState[key] = e.target.value;
    this.setState({formState: formState});
  }
  handleSubmit(e) {
    e.preventDefault();
    var title = this.state.formState.search;
    if (title === '') {
      this.setState({movieDetails: {foundMovie: false, errorMessage: 'Please enter a movie title'}})
    } else {
      axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=5756ee8f&t=' + title).then( (response) => {
        console.log(response);
        var result = response.data;
        if (result.Response === "True") {
          var movieDetails = {
            foundMovie: true,
            title: result.Title,
            year: result.Year,
            director: result.Director,
            plot: result.Plot,
            posterUrl: result.Poster
          }
          this.setState({movieDetails: movieDetails})
        } else {
          this.setState({movieDetails: {foundMovie: false, errorMessage: 'The movie could not be found'}})
        }
      })
    }
  }
  render() {
    var movieData = null;
    if (this.state.movieDetails.foundMovie === true) {
      var details = this.state.movieDetails
      movieData = <MovieSummary year={details.year} director={details.director} plot={details.plot} posterUrl={details.posterUrl}/>
    } else if (this.state.movieDetails.foundMovie === false) {
      movieData = <p class="text-danger">{this.state.movieDetails.errorMessage}</p>
    }
    return (
      <div id="moviedata-app" style={{textAlign: 'center'}}>
        <h1>Movie Data</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input style={{display: 'inline-block'}} value={this.state.formState.search} type="text" name="search" onChange={this.handleChange} className="form-control"/>
            <div className="input-group-append">
              <button type="submit" style={{display: 'inline-block'}} className="btn btn-secondary">Search</button>
            </div>
          </div>
        </form>
        {movieData}
      </div>
    )
  }
}

const MovieSummary = (props) => {
  return (
    <div>
      <img src={props.posterUrl} style={{float: 'left'}}/>
      <p><b>Year: </b> {props.year}</p><br/>
      <p><b>Director: </b> {props.director}</p><br/>
      <p><b>Plot: </b> {props.plot}</p>
    </div>
  )
}

export default MovieData;
