import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.compnent";
import './sign-up-form.style.scss';
import Button from "../button/button.component";

const deafultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const resetFormFields = () => {
            setFormFields(deafultFormFields);
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Email already in use')
            }

            console.log(err);
        }

    }


    const handleChange = (event) => {
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