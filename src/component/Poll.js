import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Progressbar from './Progress_bar';
import { Navigate } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/shared'




export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams();
        const history = useNavigate();


        return (
            <Component
                params={params}
                history={history}
                {...props}
            />
        );
    };

    return Wrapper;
};

class Poll extends Component {

    state = {
        pollanswer: 'optionOne',
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, id } = this.props
        dispatch(handleAddQuestionAnswer(id,this.state.pollanswer))
    }

    handleChange = e => {
        const { value } = e.target;

        this.setState({
            pollanswer: value
        }, () => {
            console.log('pollanswer', this.state.pollanswer)
        });

    };



    render() {

        const { authedUser, id } = this.props

        if (authedUser === '') {
            return <Navigate to={`/login/${id}`} />
            //TODO: question id case redirect
            //{`/questions/${this.state.userId}`}
        }

        const { userName, question, avatarURL, isAnsweredByAuthedUser } = this.props
        const { optionOneAnswerPercentage, optionTwoAnswerPercentage, optionOneText, optionTwoText } = this.props

        return (
            isAnsweredByAuthedUser ?
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td align='left' colSpan="2"><h5>Askey by {userName} </h5></td>

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
                                    <div>
                                        <Progressbar bgcolor="#99ff66" progress={optionOneAnswerPercentage} height={30} text={optionOneText} />
                                    </div>
                                    <Progressbar bgcolor="#99ff66" progress={optionTwoAnswerPercentage} height={30} text={optionTwoText} />

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                :
                <div>
                    <table >
                        <tbody>
                            <tr>
                                <td align='left' colSpan="2"><h5>{userName} asks:</h5></td>

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
                                    <form onSubmit={this.handleSubmit}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type="radio"
                                                            value="optionOne" defaultChecked name="pollanswer"
                                                            onChange={this.handleChange} />
                                                        {question.optionOne.text}

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input type="radio" value="optionTwo" name="pollanswer" onChange={this.handleChange} />
                                                        {question.optionTwo.text}

                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <button type='submit'  >
                                                            Submit
                                                        </button>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
        )

    }


}

function mapStateToProps({ users, authedUser, questions }, props) {


    const question = questions[props.params.id]

    let userName = null
    let avatarURL = null
    let isAnsweredByAuthedUser = false
    let optionOneAnswerPercentage = null
    let optionTwoAnswerPercentage = null
    let optionOneText = null
    let optionTwoText = null
    let optionTwoAnswerCount = null
    let optionOneAnswerCount = null
    let totalAnswerCount = null
    let optionOneSelected = null
    let optionTwoSelected = null

    if (question !== undefined) {

        userName = users[question.author].name
        avatarURL = users[question.author].avatarURL

        optionOneSelected = question.optionOne.votes.includes(authedUser)
        optionTwoSelected = question.optionTwo.votes.includes(authedUser)

        if (optionOneSelected || optionTwoSelected) {
            isAnsweredByAuthedUser = (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))

        }

        optionOneAnswerCount = question.optionOne.votes.length
        optionTwoAnswerCount = question.optionTwo.votes.length
        totalAnswerCount = optionOneAnswerCount + optionTwoAnswerCount
        optionOneAnswerPercentage = (optionOneAnswerCount / totalAnswerCount) * 100
        optionTwoAnswerPercentage = (optionTwoAnswerCount / totalAnswerCount) * 100
        optionOneAnswerPercentage=optionOneAnswerPercentage.toFixed(0)
        optionTwoAnswerPercentage=optionTwoAnswerPercentage.toFixed(0)

        optionOneText = optionOneAnswerCount + ' out of ' + totalAnswerCount + ' votes'
        optionTwoText = optionTwoAnswerCount + ' out of ' + totalAnswerCount + ' votes'

        if (optionOneSelected) {
            optionOneText = optionOneText + ' **YOUR VOTE**'
        }
        if (optionTwoSelected) {
            optionTwoText = optionTwoText + ' **YOUR VOTE**'
        }






    }


    return {

        users: Object.values(users),
        authedUser,
        id: props.params.id,
        userName,
        avatarURL,
        question,
        isAnsweredByAuthedUser,
        optionOneAnswerPercentage,
        optionTwoAnswerPercentage,
        optionOneText,
        optionTwoText,


    }
}


export default withRouter(connect(mapStateToProps)(Poll))