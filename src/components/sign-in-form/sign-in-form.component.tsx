import {ChangeEvent, FormEvent, useState} from "react";
import FormInput from "../form-input/form-input.compnent";
import './sign-in-form.style.scss';
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user-action";


const deafultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(deafultFormFields);
    const {email, password} = formFields;

    const logGoogleUser = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetFormFields = () => {
            setFormFields(deafultFormFields);
        }

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with Email</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type='email' name='email' onChange={handleChange} value={email} />
                <FormInput label='Password' required type='password' name='password' onChange={handleChange} value={password} />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button onClick={logGoogleUser}  type='button' buttonType={BUTTON_TYPES_CLASSES.google}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;