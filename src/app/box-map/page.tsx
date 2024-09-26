'use client'
import BoxMap from "@/components/box-map"
import { useEffect, useState } from "react";

const boxNumber = 6;

const BoxMapPage = () => {
    const [boxClicked, setBoxClicked] = useState<number[]>([]);
    const arrBox: undefined[] = [...Array(boxNumber)];

    const delayRemove = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 500);
        })
    }

    useEffect(() => {
        const removeLast = async (currentArray: number[]) => {
            if (currentArray.length === 0) {
                return;
            }

            const newArray = [...currentArray];
            newArray.pop();
            await delayRemove();
            setBoxClicked(newArray);
            removeLast(newArray);
        }

        if (boxClicked.length === boxNumber) {
            removeLast(boxClicked);
        }
    }, [boxClicked])

    const handleBoxClick = (index: number) => {
        if (boxClicked.includes(index)) {
            return;
        }

        setBoxClicked(boxClicked.concat(index));
    }
    
    return (
        <div className="container p-5">
            {
                arrBox.map((_, index) => (
                    <BoxMap 
                        key={index}
                        boxKey={index}
                        handleBoxClick={() => handleBoxClick(index)}
                        backgroundColor={
                            boxClicked.includes(index) ? 'green' : 'transparent'
                        }
                    />
                ))
            }
        </div>
    )
}

export default BoxMapPage