import { useState, useEffect } from "react"
import SpinnerCong from "../SpinnerCong/SpinnerCong";

const LoaderComponent = () => {

    const [ loader, setLoader ] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

  return loader ? <div className="spinner"><SpinnerCong/></div> : null;
}

export default LoaderComponent
