import './form-input.style';
import {FC, InputHTMLAttributes} from "react";
import {FormInputLabel, Group, Input} from "./form-input.style";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {

    return(
        <Group>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel
                    shrink={Boolean(
                        otherProps.value &&
                        typeof otherProps.value === 'string' &&
                        otherProps.value.length
                    )}
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput;