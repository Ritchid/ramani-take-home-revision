import React, {useRef} from "react";
import LoadingBar, {LoadingBarRef, } from "react-top-loading-bar";

function LoadingIndicator(): JSX.Element {
    const ref = useRef<LoadingBarRef>(null);

    return (
        <>
            <LoadingBar color='#371861' ref={ref} />
        </>
    );
}

export default LoadingIndicator;