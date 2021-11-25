import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'
import { useParams } from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'



export const withRouter = (Component) => {
  const Wrapper = (props) => {
      const params = useParams();
      const history = useNavigate();
      const location = useLocation();

      return (
          <Component
              params={params}
              history={history}
              location={location}
              {...props}
          />
      );
  };

  return Wrapper;
};

class LeaderBoard extends Component {

    render() {

      const { authedUser} = this.props

      if (authedUser === '') {
          return <Navigate to={`/login`} state={{pathname: '/leaderboard'}}  />
      }


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



function mapStateToProps({ users,authedUser }) {

    const leaderBoardUserKeys = Object.keys(users).sort(
        (a, b) =>
            (users[b].questions.length+Object.keys(users[b].answers).length) -
            (users[a].questions.length+Object.keys(users[a].answers).length) 
            )


    return {
        userKeys: leaderBoardUserKeys,
        authedUser
    }
}


export default withRouter(connect(mapStateToProps)(LeaderBoard))