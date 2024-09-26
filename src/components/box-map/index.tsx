'use client'
import { memo } from "react";
import { BoxProps } from "./types"

const BoxMap = memo(({boxKey, handleBoxClick, backgroundColor}: BoxProps) => {

    const onClickBox = () => {
        handleBoxClick();
    }

    return (
        <div 
            key={boxKey}
            className="border-2 border-black h-20 w-20 inline-block mr-2"
            style={{
                backgroundColor: backgroundColor
            }}
            onClick={onClickBox}
        />
    )
})

export default BoxMap