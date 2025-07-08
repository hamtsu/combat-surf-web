"use client"

import { FC, useEffect, useState } from 'react'
import Item from './Item'
import path from 'path'
import AWPIcon from '../Icons/AWP'

type AwpsListProps = {
    items: string[]
}

const AwpsList: FC<AwpsListProps> = ({ items }) => {
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
        <div id='awps-list' className="opacity-0 animate-fade-in bg-stone-800 p-3 mx-7 rounded-lg h-fit flex flex-wrap gap-3">
            <div className='flex items-center gap-4'>
                <div className="rounded-md bg-stone-900 px-2">
                    <AWPIcon color="#57534e" />
                </div>
                <h1 className="text-stone-400 font-bold text-3xl">
                    <b>AWPs</b>
                    <span className='text-stone-500'> - </span>
                    <b>Snipers</b>
                </h1>

                <div className='bg-stone-900 p-1 px-2 rounded-sm font-mono text-stone-300 opacity-70'>{imagePaths.length} items</div>

                <input
                    type="text"
                    name="awp-search"
                    className="bg-stone-900 rounded-md p-2 px-3 text-stone-200 w-[250px]"
                    placeholder="Filter AWPs..."
                    onChange={handleSearch}
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>
            <div className="flex flex-wrap content-start gap-3 h-[510px] overflow-y-scroll w-full px-1">
                {imagePaths
                    .map((src, index) => (
                        <Item key={path.parse(src).name} src={src} index={index} isFirstLoad={isFirstLoad} />
                    ))}
            </div>
        </div>
    )
}

export default AwpsList