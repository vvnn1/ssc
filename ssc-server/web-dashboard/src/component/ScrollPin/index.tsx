import { useEffect, useState } from "react";
import './index.sass'

interface ScollPinProps {
    containerRef: React.RefObject<HTMLDivElement>;
}
const ScrollPin = (props: ScollPinProps) => {
    const [showScollPin, setShowScollPin] = useState(false);

    const containerScollListener = () => {
        if (props.containerRef.current?.scrollTop === 0) {
            setShowScollPin(false);
        } else {
            setShowScollPin(true);
        }
    }

    useEffect(() => {
        props.containerRef.current?.addEventListener('scroll', containerScollListener)
    }, []);

    return (
        <div className="scroll-pin-decoration scroll-pin-decoration-top" style={showScollPin ? { display: 'block' } : { display: 'none' }}></div>
    )
};

export default ScrollPin;