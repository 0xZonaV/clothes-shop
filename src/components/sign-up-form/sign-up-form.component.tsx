import {ChangeEvent, FormEvent, useState} from "react";
import FormInput from "../form-input/form-input.compnent";
import './sign-up-form.style.scss';
import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user-action";
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;

const deafultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetFormFields = () => {
            setFormFields(deafultFormFields);
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === 'auth/email-already-in-use') {
                alert('Email already in use')
            }
            console.log(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with Email</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type='text' name='displayName' onChange={handleChange} value={displayName} />
                <FormInput label='Email' required type='email' name='email' onChange={handleChange} value={email} />
                <FormInput label='Password' required type='password' name='password' onChange={handleChange} value={password} />
                <FormInput label='Confirm Password' required type='password' name='confirmPassword' onChange={handleChange} value={confirmPassword} />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;