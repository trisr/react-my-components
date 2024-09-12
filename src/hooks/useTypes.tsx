import { useState } from 'react';
import axios from 'axios';

import useMountEffect from './useMountEffect';
import { TYPE_API } from '@/constants/data';
import { TypeProps } from '@/types/types';

const useTypes = () => {
    const [typeList, setTypeList] = useState<TypeProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    const fetchTypes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(TYPE_API);
            setTypeList(response.data);
        } catch (err) {
            setError(err);
        } finally{
            setLoading(false)
        }
    }

    useMountEffect(() => {
        fetchTypes();
    }, [])

    return { typeList, loading, error }
}

export default useTypes;