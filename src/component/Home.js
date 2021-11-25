import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Question from './Question'

class Home extends Component {

    state = {
        undansweredQuestionsSelected: true,
    }

    toggleTab = (e) => {

        this.setState(() => ({
            undansweredQuestionsSelected: !this.state.undansweredQuestionsSelected
        }))


    }

    render() {

        const { authedUser } = this.props

        if (authedUser === '') {
            return <Navigate to='/login' />
        }


        return (
            <div className='center'>
                <button className={this.state.undansweredQuestionsSelected ? 'btnselected' : 'btn'}
                    disabled={this.state.undansweredQuestionsSelected}
                    onClick={this.toggleTab}>
                    Unanswered Questions
                </button>
                <button className={!this.state.undansweredQuestionsSelected ? 'btnselected' : 'btn'}
                    disabled={!this.state.undansweredQuestionsSelected}
                    onClick={this.toggleTab}>
                    Answered Questions
                </button>
                <div >
                    <table className='tablecenter'>
                        <tbody>

                            {
                                this.state.undansweredQuestionsSelected === true ?
                                    this.props.unansweredQuestionIds.map((id) => (
                                        <Fragment key={id}>
                                            <tr>
                                                <th><Question id={id} /></th>
                                            </tr>
                                        </Fragment>
                                    ))
                                    :
                                    this.props.answeredQuestionIds.map((id) => (
                                        <Fragment key={id}>
                                            <tr>
                                                <th><Question id={id} /></th>
                                            </tr>
                                        </Fragment>
                                    ))
                            }

                        </tbody>

                    </table>

                </div>



            </div>
        )
    }

}

function mapStateToProps({ users, authedUser, questions }) {

    const answeredQuestionIds = authedUser
        ? Object.keys(users[authedUser].answers).sort(
            (a, b) =>
                questions[b].timestamp -
                questions[a].timestamp
        )
        : [];

    const unansweredQuestionIds = Object.keys(questions)
        .filter(qid => !answeredQuestionIds.includes(qid))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)




    return {
        users: Object.values(users),
        authedUser,
        answeredQuestionIds: answeredQuestionIds,
        unansweredQuestionIds: unansweredQuestionIds,
    }
}


export default connect(mapStateToProps)(Home)
