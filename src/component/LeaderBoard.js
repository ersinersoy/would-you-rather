import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {

    render() {
        return (
          <div>
              {this.props.userKeys.map((id) => (
                <li className='li-leader' key={id}>
                  <User id={id} />
                </li>
              ))}
          </div>
        )
      }

}



function mapStateToProps({ users }) {

    const leaderBoardUserKeys = Object.keys(users).sort(
        (a, b) =>
            (users[b].questions.length+Object.keys(users[b].answers).length) -
            (users[a].questions.length+Object.keys(users[a].answers).length) 
            )


    return {
        userKeys: leaderBoardUserKeys,
    }
}


export default connect(mapStateToProps)(LeaderBoard)