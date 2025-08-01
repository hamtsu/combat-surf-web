"use client"

import React, { FC } from 'react'
import Image from 'next/image'
import path from 'path'
import { FaInfoCircle } from 'react-icons/fa'

type ItemProps = {
    src: string,
    index: number,
    isFirstLoad?: boolean
}

const Item: FC<ItemProps> = ({ src, index, isFirstLoad }) => {
    const [error, setError] = React.useState(false)
    const itemName = path.parse(path.parse(src).base).name

    return error ? (
        <div className="w-[264px] h-[160px] justify-center flex flex-col items-center text-stone-300 bg-stone-900 p-2 rounded-md">
            <FaInfoCircle size={30} className="fill-stone-500 mb-2" />
            <span>Error loading <b>{itemName}</b></span>
        </div>
    )
        : (
            <div style={isFirstLoad ? { animationDelay: `${index * 0.1 + 3}s`, opacity: 0 } : {}} className=' z-0 animate-fade-in text-stone-200 flex flex-col gap-2 hover:cursor-pointer w-[150px] md:w-fit md:h-fit p-1 bg-stone-900 rounded-md border border-transparent hover:border-stone-600 transition-colors'>
                <div key={index} className="w-fit h-fit">
                    <Image
                        src={src}
                        alt={itemName}
                        about={src}
                        width={246}
                        height={140}
                        onError={() => setError(true)}

                        quality={100}
                    />
                </div>
                <div className='font-bold'>{itemName.replaceAll("_", " ")}</div>
            </div>

        )
}

export default Item