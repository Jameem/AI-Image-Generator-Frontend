import React from 'react';

export const ImagePeview = ({
  image,
  isGenerating,
  showDownload,
}: {
  image: string;
  isGenerating: boolean;
  showDownload: boolean;
}) => {
  return (
    <div className='image-loading'>
      <div className='image'>
        <img src={image} alt='aiimage' />
        {showDownload && (
          <a
            href={image}
            download={`${prompt}.png`}
            className='download'
            target='blank'
          >
            Download
          </a>
        )}
      </div>
      <div className='loading'>
        <div className={isGenerating ? 'full-bar' : 'bar'}></div>
        <div className={isGenerating ? 'text' : 'hide-text'}>Generating...</div>
      </div>
    </div>
  );
};
