'use client'
import { createRef } from 'react';

import useMonster from "@/hooks/useMonsters";
import useTypes from "@/hooks/useTypes";

const FormPage: React.FC = () => {
    const { monsterList, loading, addMonster, deleteMonster } = useMonster();
    const { typeList, loading: typeLoading } = useTypes();

    const ref = createRef<HTMLFormElement>();

    const handleSubmit = (e: {
        currentTarget: HTMLFormElement | undefined; preventDefault: () => void; 
    }) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        
        const typeVal = typeList.find(obj => {
            return (obj.id).toString() === formData.get('type')
        })
        const request = {
            name: formData.get('name')?.toString(),
            type: typeVal
        }
        addMonster(request);
        ref?.current?.reset()
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between">
                <div className="w-1/2">
                    <form ref={ref} onSubmit={handleSubmit}>
                        <input 
                            className=" w-50 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text" 
                            name="name" 
                            placeholder="Input monster name" 
                        />
                        <select 
                            className="block h-full rounded-md border-0 py-0 pl-2 pr-7 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" 
                            name="type"
                        >
                            {
                                !typeLoading && typeList.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))
                            }
                        </select>
                        <button className="bg-green-300 rounded-md py-2 px-3 text-gray-900" type="submit">Add</button>
                    </form>
                </div>
                <div className="w-1/2">
                    <ul>
                        {
                            !loading && monsterList.map((monster) => (
                                <li className='mb-3' key={monster.id}>
                                    {monster.name}
                                    <span className='block'>{monster.type?.name}</span>
                                    <div onClick={() => deleteMonster(monster.id)}>x</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FormPage