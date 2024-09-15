import React from 'react';
import tick from '../../assets/tick.svg';

const ValidationWarning = ({ valid, validMsg, errorMsg }) => {
  return (
    <div>
      <img
        src={tick}
        alt="tick"
        className={
          valid === true
            ? 'tick'
            : valid === 'valid'
            ? 'tick valid'
            : 'tick error'
        }
      />
      <span
        className={
          valid === true
            ? 'form_validation_warning'
            : valid === 'valid'
            ? 'form_validation_warning valid_txt'
            : 'form_validation_warning error_txt'
        }
      >
        {valid ? validMsg : errorMsg}
      </span>
    </div>
  );
};

export default ValidationWarning;
