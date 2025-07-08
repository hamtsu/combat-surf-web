"use client"

import { FC, useState } from 'react'
import Item from './Item'
import path from 'path'
import { GiAk47 } from 'react-icons/gi'

type AksListProps = {
    items: string[]
}

const AksList: FC<AksListProps> = ({ items }) => {
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
        <div id="aks-list" className="opacity-0 w-[50%] animate-fade-in-third bg-stone-800 p-3 rounded-lg h-fit flex flex-wrap gap-3">
            <div className='flex items-center gap-4'>
                <div className="rounded-md bg-stone-900 p-3">
                    <GiAk47 size={35} className="fill-stone-600 " />
                </div>
                <h1 className="text-stone-400 font-bold text-3xl">
                    <b>AK-47</b>
                </h1>

                <div className='bg-stone-900 p-1 px-2 rounded-sm font-mono text-stone-300 opacity-70'>{imagePaths.length} items</div>

                <input
                    type="text"
                    name="ak47-search"
                    className="bg-stone-900 rounded-md p-2 px-3 text-stone-200 w-[250px]"
                    placeholder="Filter AK-47s..."
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

export default AksList