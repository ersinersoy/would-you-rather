import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {

    render() {

        const { userName, createdQuestionsCount, avatarURL, answeredQuestionsCount, totalScore } = this.props

        return (
            <table>
                <tbody>
                    <tr>
                        <td rowSpan='3'>
                            <img
                                src={avatarURL}
                                alt={`Avatar of ${userName}`}
                                className='avatar'
                            />
                        </td>
                        <td style={{ 'fontWeight': 'bold' }}>
                            {userName}
                        </td>
                        <td></td>
                        <td style={{ 'textAlign': 'center', 'fontWeight': 'bold' }}> Score</td>
                    </tr>
                    <tr>
                        <td>Answered Questions:</td>
                        <td>{answeredQuestionsCount}</td>
                        <td style={{ 'textAlign': 'center', 'fontWeight': 'bold' }}>{totalScore}</td>

                    </tr>
                    <tr>
                        <td>Created Questions:</td>
                        <td>{createdQuestionsCount}</td>
                        <td></td>

                    </tr>
                </tbody>
            </table>
        )
    }

}

/*
tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
*/

function mapStateToProps({ users }, { id }) {
    const user = users[id]
    const userName = user.name
    const avatarURL = user.avatarURL
    const createdQuestionsCount = user.questions.length
    const answeredQuestionsCount = user.answers ? Object.keys(user.answers).length : 0
    const totalScore = createdQuestionsCount + answeredQuestionsCount


    return {

        userName,
        avatarURL,
        createdQuestionsCount,
        answeredQuestionsCount,
        totalScore
    }
}

export default connect(mapStateToProps)(User)