import React from 'react';

export const ImageSearch = ({
  onChange,
  isGenerating,
  onClickGenerate,
  onChangeSize,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSize: React.ChangeEventHandler<HTMLSelectElement>;
  isGenerating: boolean;
  onClickGenerate: () => void;
}) => {
  return (
    <div className='search-wrapper'>
      <div className='search'>
        <input
          type='text'
          className='search-prompt'
          placeholder='Describe what you want to generate.'
          onChange={onChange}
        />
        <select className='search-size' onChange={onChangeSize}>
          <option value={'512x512'}>512x512</option>
          <option value={'256x256'}>256x256</option>
        </select>
        <button
          className='button'
          disabled={!prompt || isGenerating}
          onClick={onClickGenerate}
        >
          Generate
        </button>
      </div>
    </div>
  );
};
