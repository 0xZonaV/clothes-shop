// @ts-ignore
import {BaseButton, GoogleSignInButton, InvertedButton, LoadingSpinner} from "./button.style";
import React from "react";

export enum BUTTON_TYPES_CLASSES {
    base= "base",
    google= 'google-sign-in',
    inverted= 'inverted'
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
    ({
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType]);


type ButtonProps = {
    children: React.ReactNode;
    buttonType: BUTTON_TYPES_CLASSES;
    isLoading: boolean;
}

const Button = ({ children, buttonType, isLoading = false, ...otherProps }: ButtonProps) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <LoadingSpinner /> : children}
        </CustomButton>
    );
};

export default Button;