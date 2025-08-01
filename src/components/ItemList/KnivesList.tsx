"use client"

import { FC, useState } from 'react'
import Item from './Item'
import path from 'path'
import { GiPunch } from 'react-icons/gi'

type KnivesListProps = {
    items: string[]
}

const KnivesList: FC<KnivesListProps> = ({ items }) => {
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [imagePaths, setImagePaths] = useState<string[]>(items);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFirstLoad(false);

        const searchTerm = event.target.value.toLowerCase();

        if (searchTerm.length === 0) {
            setImagePaths(items);
            return;
        }
        setImagePaths(items.filter(item => item.toLowerCase().includes(searchTerm)));
    };

    return (
        <div id='knives-list' className="opacity-0 animate-fade-in-second bg-stone-800 p-3 md:mx-7 rounded-lg h-fit flex flex-wrap gap-3">
            <div className='flex items-center gap-4'>
                <div className="rounded-md hidden md:block bg-stone-900 p-3">
                    <GiPunch size={30} className="fill-stone-600 " />
                </div>
                <h1 className="text-stone-400 font-bold text-3xl">
                    <b>Melee</b>
                </h1>

                <div className='bg-stone-900 p-1 px-2 hidden md:block rounded-sm font-mono text-stone-300 opacity-70'>{imagePaths.length} items</div>

                <input
                    type="text"
                    name="knife-search"
                    className="bg-stone-900 rounded-md p-2 px-3 text-stone-200 w-[140px] md:w-[250px]"
                    placeholder="Filter Knives..."
                    onChange={handleSearch}
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>
            <div className="flex flex-wrap content-start gap-3 h-[510px] overflow-y-scroll w-full px-1">
                {imagePaths
                    .map((src, index) => (
                        <Item key={path.parse(src).name} src={src} index={index} />
                    ))}
            </div>
        </div>
    )
}

export default KnivesList