import { useState } from 'react';
import axios from 'axios';

import useMountEffect from './useMountEffect';
import { MONSTERS_API } from '@/constants/data';
import { MonstersProps } from '@/types/monsters';

const useMonster = () => {
    const [monsterList, setMonsterList] = useState<MonstersProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    const fetchMonsters = async () => {
      try {
          setLoading(true);
          const response = await axios.get(MONSTERS_API);
          setMonsterList(response.data);
      } catch (err) {
          setError(err);
      } finally{
          setLoading(false)
      }
    }

    const addMonster = async (formData: MonstersProps) => {
      try {
          const response = await axios.post(MONSTERS_API, formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    
          if (response) {
              fetchMonsters()
          } else {
            console.error('Failed to add to list')
          }
        } catch (error) {
          console.error('Error:', error)
      }
    }

    const deleteMonster = async (monsterId: number | undefined) => {
      try {
        const response = await axios.delete(MONSTERS_API + `/${monsterId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
  
        if (response) {
            fetchMonsters()
        } else {
          console.error('Failed to delete monster')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    useMountEffect(() => {
        fetchMonsters();
    }, [])

    return { monsterList, loading, error, addMonster, deleteMonster }
}

export default useMonster;