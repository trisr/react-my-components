import { DependencyList, useEffect, useRef } from "react"; 

const useMountEffect = (callback: any, dependencies: DependencyList | undefined) => { 
    const isFirstRender = useRef(true);
    useEffect(() => { 
        if (isFirstRender.current) { 
            isFirstRender.current = false; 
            return; 
        } 
        
        return callback(); 
    }, dependencies); 
}; 
export default useMountEffect;