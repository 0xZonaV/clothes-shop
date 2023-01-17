import {SpinnerOverlay, SpinnerContainer} from './spinner.style';
import {FC} from "react";

const Spinner: FC = () =>
    <SpinnerOverlay>
        <SpinnerContainer />
    </SpinnerOverlay>

export default Spinner;