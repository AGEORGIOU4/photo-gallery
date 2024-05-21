import React, { useState, useEffect } from 'react';
import { CRow, } from '@coreui/react-pro';
import { typewriterEffect } from '../../helpers'

export const CTitle = () => {
  const [pageTitle, setText] = useState('');

  useEffect(() => {
    typewriterEffect('Explore Captivating Moments on ', setText);
  }, []);

  return (
    <>
      <CRow className="text-center">
        <h1 className="typewriter">
          {pageTitle}
          <span className="highlight-text">Click</span>
        </h1>
      </CRow>
    </>
  );
};
