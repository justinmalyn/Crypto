import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, alerts}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });
    const {email, password} = formData;
    
    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    let emailError, passwordError;
    for(let i=0; i<alerts.length; i++){
        if(alerts[i].msg==="Please include a valid email"){
            emailError=alerts[i].msg
        }
        if(alerts[i].msg==="Invalid Credentials"){
            passwordError=alerts[i].msg
        }
    }
    console.log(alerts)
    return(
        <Fragment>
            <div id="loginDiv">Log In</div>
            <div className='enterForm'>
                <form id="loginForm" onSubmit={e => onSubmit(e)}>
                    <div>
                        <div className="formDiv">
                            <input
                                className="formInput"
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                            />
                            <div className="divider"></div>
                            <div className="error">{emailError}</div>
                        </div>
                        <div className="formDiv">
                            <input
                                className='formInput'
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                            />  
                            <div className="divider"></div>  
                            <div className="error">{passwordError}</div>
                        </div>
                    </div>
                    <input type='submit' className="enterButton" value='Login' />
                </form>
            <p>
                Don't have an account? <Link to='/register' className="link">Sign Up</Link>
            </p>
            </div>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
  
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts:state.alert
});

export default connect(
    mapStateToProps,
    { login }
)(Login);