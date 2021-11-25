import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Navigate } from 'react-router-dom'

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

export default connect()(NewQuestion)