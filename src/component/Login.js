import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom'


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


class Login extends Component {

    state = {
        selectedUser: '',
    }

    handleChange = (e) => {

        const selectedUser = e.target.value

        this.setState(() => ({
            selectedUser
        }))


    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { selectedUser } = this.state
        const { dispatch } = this.props

        dispatch(setAuthedUser(selectedUser))


    }



    render() {

        const { authedUser,id,question,redirectURL } = this.props
        const { selectedUser } = this.state

        if (authedUser !== '' && id!==undefined) {
            if (question!==undefined)
            {
                return <Navigate to={`/questions/${id}`} />
            }
            else
            {
                return <div>404: Page Not Found</div>
            }
        }

        if (authedUser!=='' && redirectURL!==null)
        {
            return <Navigate to={redirectURL} />

        }

        if (authedUser !== '') {
            return <Navigate to='/' />
        }


        return (
            <div className='center'>
                <h3>Sign In</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <select id="userSelect" onChange={this.handleChange} value={selectedUser}>
                        {this.props.users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                        <option value=""></option>
                    </select>
                    <button
                       
                        type='submit'
                        disabled={selectedUser === ''}>
                        Sign In
                    </button>
                </form>
            </div>
        )
    }


}

function mapStateToProps({ users, authedUser,questions },props) {
    const question = questions[props.params.id]
    const redirectURL = props.location.state ? props.location.state.pathname : null



    return {
        users: Object.values(users),
        authedUser,
        id:props.params.id,
        question,
        redirectURL
    }
}


export default withRouter(connect(mapStateToProps)(Login))

