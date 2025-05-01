import React, { FC } from 'react'
import { FaCodeBranch } from 'react-icons/fa6';
import ReactMarkdown from "react-markdown";

type ChangelogItemProps = {
    title: string,
    version: string,
    date: string,
    content: string
}

const ChangelogItem: FC<ChangelogItemProps> = ({ title, version, date, content }) => {
  return (
    <div id={date} className='bg-stone-800 rounded-md prose prose-stone prose-invert prose-headings:m-0 prose-p:m-0 w-5/6 md:w-1/2 mb-4'>
        <div className='flex flex-col gap-2 p-4'>
            <h2 className='text-lg font-semibold text-stone-400 flex items-center gap-2'><FaCodeBranch /> {version} - {date}</h2>
            <h1 className='text-3xl font-bold pb-4'>{title}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    </div>
  )
}

export default ChangelogItem