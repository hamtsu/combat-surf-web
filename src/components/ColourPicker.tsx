import React, { useState } from 'react';

interface ColourPickerProps {
    id: string;
    label: string;
    value?: string;
    onChange: (id: string, value: string) => void;
}

export const ColourPicker: React.FC<ColourPickerProps> = ({ id, label, value, onChange }) => {

    return (
        <div className='flex flex-col gap-1 bg-stone-800 rounded-md p-1 w-fit h-fit'>
            <label className='text-stone-300 text-sm font-semibold' htmlFor={id}>{label}</label>
            <input
                id={id}
                className='bg-stone-800 rounded-md h-8 -mt-1 w-16'
                type="color"
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
            />
        </div>
    );
};