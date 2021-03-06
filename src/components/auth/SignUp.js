import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
// Components
import PicturePreview from '../misc/PicturePreview';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
        // profilePicture: null,
        // pictureURL: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // handleFileChange = (e) => {
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    //     reader.onloadend = () => {
    //         this.setState({ 
    //             profilePicture: file,
    //             pictureURL: reader.result 
    //         });
    //     }
    //     reader.readAsDataURL(file);
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to="/" />;
        
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <p className="flow-text">Please sign up with an email other users may contact you at.</p>
                    <div className="red-text text-darken-3">
                            { authError ? <h5>{authError}</h5> : null }
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    {/* <div className="input-field">
                        <input type="file" id="profilePicture" onChange={this.handleFileChange}/>
                        { this.state.pictureURL ? <PicturePreview pictureURL={this.state.pictureURL}/> : null }
                    </div> */}
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                    </div>                
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (userInfo) => dispatch(signUp(userInfo))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
