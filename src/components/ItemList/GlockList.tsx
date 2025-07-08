"use client"

import { FC, useState } from 'react'
import Item from './Item'
import path from 'path'
import { FaGun } from 'react-icons/fa6'

type GlockListProps = {
    items: string[]
}

const GlockList: FC<GlockListProps> = ({ items }) => {
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
        <div id='glocks-list' className="opacity-0 w-[50%] animate-fade-in-fifth bg-stone-800 p-3 rounded-lg h-fit flex flex-wrap gap-3">
            <div className='flex items-center gap-4'>
                <div className="rounded-md bg-stone-900 p-3">
                    <FaGun size={30} className="fill-stone-600 " />
                </div>
                <h1 className="text-stone-400 font-bold text-3xl">
                    <b>Glocks</b>
                </h1>

                <div className='bg-stone-900 p-1 px-2 rounded-sm font-mono text-stone-300 opacity-70'>{imagePaths.length} items</div>

                <input
                    type="text"
                    name="glock-search"
                    className="bg-stone-900 rounded-md p-2 px-3 text-stone-200 w-[250px]"
                    placeholder="Filter Glocks..."
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

export default GlockList