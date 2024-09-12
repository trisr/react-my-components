import { TypeProps } from "./types";

export interface MonstersProps {
    id?: number;
    name: string | undefined;
    type: TypeProps | undefined;
    isFavorite?: boolean;
}

export interface MonstersFormProps {
    name: string;
    type: number;
}

export interface MonsterContextProps {
    monsterList: MonstersProps[],
    fetchMonsterList: () => void
}