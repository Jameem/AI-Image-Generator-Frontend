import React, { useState } from 'react';
import axios from 'axios';

import './styles.css';
import { ImagePeview } from './ImagePreview';
import { ImageSearch } from './ImageSearch';
import { Footer } from '../Footer';

const gibberish = require('gibberish-detective')({ useCache: false });
const badWordsFilter = require('bad-words');
const filter = new badWordsFilter();

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('512x512');
  const [image, setImage] = useState();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const onClickGenerate = async () => {
    if (!prompt) {
      setError('Please enter a meaningful sentence!');
      return;
    }

    if (gibberish.detect(prompt)) {
      setError('Please enter a meaningful sentence!');
      return;
    }

    if (filter.isProfane(prompt)) {
      setError('Please use profane language!');
      return;
    }

    setGenerating(true);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/generateimage`,
      {
        prompt,
        size,
      }
    );

    if (!response?.data?.success || !response.data?.image[0]?.url) {
      console.log('error');
      setError('Something went wrong. Please try again!');
      return;
    }
    setImage(response.data.image[0].url);
    setGenerating(false);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setPrompt(e.target.value);
  };

  const onChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  return (
    <div className='image-generator'>
      <div className='header'>
        AI Image <span>Generator</span>
      </div>
      <ImagePeview
        image={image ? image : 'default.png'}
        isGenerating={generating}
        showDownload={image ? true : false}
      />
      {error && <div className='error'>{error}</div>}
      <ImageSearch
        onChange={onChangeSearch}
        onChangeSize={onChangeSize}
        onClickGenerate={onClickGenerate}
        isGenerating={generating}
      />
      <Footer />
    </div>
  );
};
