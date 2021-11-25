import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const withRouter = (Component) => {
    const Wrapper = (props) => {
      const history = useNavigate();
      
      return (
        <Component
          history={history}
          {...props}
          />
      );
    };
    
    return Wrapper;
  };

class Question extends Component {

    handleViewPoll = (e, id) => {
        e.preventDefault()
        this.props.history(`/questions/${id}`)
    }

    render() {

        const {userName,questionText,avatarURL,id} =this.props

        return (
                <table className='center'>
                <tbody>
                        <tr>
                            <td align='left' colSpan="2">{userName}</td>

                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={avatarURL}
                                    alt={`Avatar of ${userName}`}
                                    className='avatar'
                                />
                            </td>
                            <td>
                                <h4>Would you rather</h4>
                                <h5>{questionText}</h5>
                                <button className='btn' onClick={(e) => this.handleViewPoll(e, id)}>
                                View Poll
                                </button>
                            </td>
                        </tr>
                        </tbody>
                </table>
        )
    }

}

function mapStateToProps({ users, authedUser, questions }, { id }) {
    const question = questions[id]
    const questionText = question.optionOne.text
    const userName = users[question.author].name
    const avatarURL = users[question.author].avatarURL

    return {

        users: Object.values(users),
        authedUser,
        id,
        userName,
        avatarURL,
        questionText,
    }
}

export default withRouter(connect(mapStateToProps)(Question))