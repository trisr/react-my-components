'use client'
import BoxMap from "@/components/box-map"
import { useCallback, useEffect, useState } from "react";
import { BoxColorProps } from "./types";

// TODO
// 1. click green --> change current element to red and add 1 new green element at the end of the list
// 2. click rede --> delete current element
// 3. add a button to reset the list of colors to its initial state
// 4. render a history of user actions (clicks)

const initialValue = [
    {
        id: 1,
        value: 'red'
    },
    {
        id: 2,
        value: 'green'
    },
    {
        id: 3,
        value: 'red'
    },
];

const BoxMap2Page = () => {
    const [boxColorList, setBoxColorList] = useState<BoxColorProps[]>(initialValue);
    const [history, setHistory] = useState<string[]>([]);

    // function is created only once during the initial render and 
    // won't change on subsequent renders unless the dependencies change.
    const handleBoxClick = useCallback(function onClick(box: BoxColorProps, index: number) {
        const newBoxList = [...boxColorList];

        if (box.value === 'green') {
            newBoxList[index] = {
                ...newBoxList[index],
                value: 'red'
            }

            const addedBox = {
                id: Math.random() * 1000,
                value: 'green'
            }

            newBoxList.push(addedBox);
            setHistory([
                ...history,
                `Box ${index + 1} turned red then add new green on the last index. Box count: ${newBoxList.length}`
            ])
        }

        if (box.value === 'red') {
            newBoxList.splice(index, 1);
            setHistory([
                ...history,
                `Box ${index + 1} removed. Box count: ${newBoxList.length}`
            ])
        }

        setBoxColorList(newBoxList);
    }, [boxColorList])

    const handleReset = () => {
        setBoxColorList(initialValue)
        setHistory([])
    }
    
    return (
        <div className="container p-5">
            {
                boxColorList.map((box, index) => (
                    <BoxMap 
                        key={box.id}
                        boxKey={box.id}
                        handleBoxClick={() => handleBoxClick(box, index)}
                        backgroundColor={box.value}
                    />
                ))
            }
            <div>
                <button onClick={handleReset} className="border-black border-2 p-2 rounded">Reset</button>
            </div>
            <ul>
                {
                    history.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BoxMap2Page