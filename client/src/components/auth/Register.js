import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({setAlert, register, isAuthenticated, alerts}) => {
    const [formData, setformData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name, email, password, password2} = formData;

    const onChange = e => 
        setformData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match');
        } else{
            register({name, email, password});
        } 
    };

    let nameError, emailError, passwordError;
    for(let i=0; i<alerts.length; i++){
        if(alerts[i].msg ==="Name is required"){
            nameError=alerts[i].msg
        }
        if(alerts[i].msg==="Please include a valid email"){
            emailError=alerts[i].msg
        }
        if(alerts[i].msg==="Please enter a password with 6 or more characters"){
            passwordError=alerts[i].msg
        }
        if(alerts[i].msg==="Passwords do not match"){
            passwordError=alerts[i].msg
        }
        if(alerts[i].msg==="User already exists"){
            emailError=alerts[i].msg
        } 
    }
    
    console.log(alerts)

    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return(
        <Fragment>
            <div id="loginDiv"><p>Sign Up</p></div>
            <div className='enterForm reg'>
                <form id="loginForm" onSubmit={e => onSubmit(e)}>
                    <div className="formDiv">
                    <input 
                        className="formInput"
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e=>onChange(e)}
                    />
                    <div className="divider"></div>
                    <div className="error">{nameError}</div>
                    </div>
                    <div className="formDiv">
                    <input
                        className="formInput"
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <div className="divider"></div>
                    <div className="error">{emailError}</div>
                    </div>
                    <div className="formDiv">
                    <input
                        className="formInput"
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                    />    
                    <div className="divider"></div>
                    <div className="error">{passwordError}</div>
                    </div>
                    <div className="formDiv">
                    <input
                        className="formInput"
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                    <div className="divider"></div>
                    <div className="error">{}</div>
                    </div>
                    <input type='submit' className="enterButton" value='Register' />
                </form>
                <p className='my-1'>
                    Already have an account? <Link to='/login' className="link">Sign In</Link>
                </p>
            </div>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
  
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts:state.alert
});
  
export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);