import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Login from './Login'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Logout from './Logout'
import Poll from './Poll'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'


class App extends Component {

  componentDidMount() {

    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              :
              <Fragment>
                <Nav />
                <div>
                  <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/questions/:id/' element={<Poll />} />
                    <Route path='/login/:id/' element={<Login />} />
                    <Route path='/add' element={<NewQuestion />} />
                    <Route path='/leaderboard' element={<LeaderBoard />} />
                  </Routes>
                </div>
              </Fragment>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)