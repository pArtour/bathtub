import React, {useEffect, useState} from 'react';

const MAX_LEVEL = 5;
const MIN_LEVEL = 0;
const STEP = 1;

enum Action {
    INCREASE = "increase",
    DECREASE = "decrease"
}

interface AppProps {
    durationMs: number,
    minLevel: number,
    maxLevel: number
}
export const App: React.FC<Partial<AppProps>> = ({durationMs = 2000, minLevel = MIN_LEVEL, maxLevel = MAX_LEVEL}) => {
    const [level, setLevel] = useState<number>(minLevel);
    const [action, setAction] = useState<null | Action>(null);

    if (maxLevel === 0 || maxLevel <= minLevel) {
        throw Error("Invalid props")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (action === Action.INCREASE && level < maxLevel) {
                setLevel((prevWaterLevel) => prevWaterLevel + STEP);
            }
            if (action === Action.DECREASE && level > minLevel) {
                setLevel((prevWaterLevel) => prevWaterLevel - STEP);
            }
        }, durationMs);

        if (action === Action.DECREASE && level === minLevel) {
            setAction(null);
        }

        if (action === Action.INCREASE && level === maxLevel) {
            setAction(null);
        }

        return () => {
            clearInterval(interval);
        };
    }, [action, level]);

    const increaseLevel = async () => {
        if (action === Action.INCREASE) {
            setAction(null);
            return;
        }
        setAction(Action.INCREASE);
    }

    const decreaseLevel = () => {
        if (action === Action.DECREASE) {
            setAction(null);
            return;
        }
        setAction(Action.DECREASE);
    }

    return (
        <>
            <h1>Level: {level}</h1>
            <div className="wrapper">
                <div style={{height: 20 * maxLevel}}  className="bathtub">
                    {Array.from(Array(level)).map((item, index) => {
                        return <div key={index} className="water"/>
                    })}
                </div>
                <button
                    disabled={level === maxLevel || action === Action.DECREASE}
                    onClick={increaseLevel}
                    className="button"
                >
                    {action && action !== Action.DECREASE && level !== maxLevel ? "Stop" : "Increase"}
                </button>
                <button
                    disabled={level === minLevel || action === Action.INCREASE}
                    onClick={decreaseLevel}
                    className="button"
                >
                    {action && action !== Action.INCREASE && level !== minLevel ? "Stop" : "Decrease"}
                </button>
            </div>
        </>
    );
}

export default App;
