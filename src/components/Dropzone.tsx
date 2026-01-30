import React from 'react';
import { FaCheck, FaFileUpload, FaSpinner } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { ScaleLoader } from 'react-spinners';

interface DropzoneProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'banner' | 'background';
  success?: boolean;
  loading?: boolean;
  errorMessage?: string;
  background?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ onUpload, type, errorMessage, success, loading, background }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor={`dropzone-file-${type || 'banner'}`}
        style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        className="flex flex-col items-center overflow-hidden justify-center group w-full h-32 bg-stone-900 border border-dashed border-stone-500 rounded-lg cursor-pointer hover:bg-stone-700"
      >
        <div className="flex flex-col items-center justify-center text-stone-200 group-hover:bg-stone-800/30 transition-colors w-full text-body pt-5 pb-6">
          <FaFileUpload className="mb-3 text-4xl text-stone-200" />
          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs">PNG, WEBP, JPG or GIF (MAX. 5mb)</p>
        </div>
        <input
          onChange={onUpload}
          id={`dropzone-file-${type || 'banner'}`}
          type="file"
          className="hidden"
        />
      </label>
      {loading && <p className="text-yellow-500 mt-2 items-center flex gap-2"><ScaleLoader color="#eab308" height={10}/></p>}
      {success && <p className="text-green-500 flex items-center gap-2 mt-2"><FaCheck /> Upload successful!</p>}
      {errorMessage && <p className="text-red-500 flex items-center gap-2 mt-2"><FaXmark />{errorMessage}</p>}
    </div>
  );
};

export default Dropzone;