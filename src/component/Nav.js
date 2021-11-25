import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {

    render() {

        const { authedUser, authedUserdetails } = this.props

        return (
            <nav className='center'>
                <ul >
                    {authedUser === ''
                        ? null
                        :
                        <Fragment>
                            <li className='nav-li'>
                                <NavLink exact="true" to='/' activeclassname='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-li'>
                                <NavLink to='/add' activeclassname='active'>
                                    New Question
                                </NavLink>
                            </li>
                            <li className='nav-li'>
                                <NavLink to='/leaderboard' activeclassname='active'>
                                    Leader Board
                                </NavLink>
                            </li>
                            <li className='nav-li'>
                                <NavLink to='/logout' activeclassname='active'>
                                    Logout
                                </NavLink>
                            </li>
                            <li className='nav-li-avatar'>
                                <h3>Hello</h3>
                                <h4>{authedUserdetails.name}</h4>
                                <img
                                    src={authedUserdetails.avatarURL}
                                    alt={`Avatar of ${authedUserdetails.name}`}
                                    className='avatar'
                                />


                            </li>
                        </Fragment>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }) {

    let authedUserdetails = null
    if (authedUser !== null && authedUser !== '') {
        authedUserdetails = users[authedUser]
    }


    return {
        authedUser,
        authedUserdetails: authedUserdetails,


    }
}


export default connect(mapStateToProps)(Nav)
