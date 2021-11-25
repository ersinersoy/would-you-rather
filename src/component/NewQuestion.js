import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom'



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


class NewQuestion extends Component {
    state = {
        text1: '',
        text2: '',
        toHome: false,
    }
    handleChange1 = (e) => {
        const text1 = e.target.value

        this.setState(() => ({
            text1
        }))
    }

    handleChange2 = (e) => {
        const text2 = e.target.value

        this.setState(() => ({
            text2
        }))
    }


    handleSubmit = (e) => {
        e.preventDefault()

        const { text1, text2 } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(text1, text2))

        this.setState(() => ({
            toHome: true,
        }))
    }
    render() {
        const { text1, text2, toHome } = this.state

        if (toHome === true) {
            return <Navigate to='/' />
        }

        const { authedUser } = this.props

        if (authedUser === '') {
            return <Navigate to={`/login`} state={{ pathname: '/add' }} />
        }



        return (
            <div>
                <h3 className='center'>Create New Question</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2>Would you rather...</h2>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text"
                                        placeholder="Enter Option One Text Here"
                                        value={text1}
                                        onChange={this.handleChange1}
                                    />

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text"
                                        placeholder="Enter Option Two Text Here"
                                        value={text2}
                                        onChange={this.handleChange2}
                                    />

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        type='submit'
                                        disabled={text1 === '' || text2 === ''}>
                                        Submit
                                    </button>

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>
            </div>
        )
    }
}


function mapStateToProps({ authedUser }) {


    return {
        authedUser
    }
}


export default withRouter(connect(mapStateToProps)(NewQuestion))