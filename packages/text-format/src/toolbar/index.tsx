import { helpers, Text } from '@bento-editor/core';
import React, { useCallback } from 'react';
import { Attributes } from '../attributes';
import { styles } from './index.css';

const toolbar: Text<Attributes>['toolbar'] = {
  Component: ({ editor }) => {
    const createHandler = useCallback((format: keyof Attributes) => {
      return () => {
        helpers.Transforms.setNodes(
          editor,
          {
            attributes: {
              [format]: true
            },
          },
          { match: n => helpers.Text.isText(n), split: true }
        )
      };
    }, []);
    const handleBoldClick = createHandler('bold');
    const handleItalicClick = createHandler('italic');
    const handleStrikethroughClick = createHandler('strikethrough');
    const handleUnderlineClick = createHandler('underline');

    return (
      <ul className={styles.list}>
        <li>
          <button className={styles.button} onClick={handleBoldClick}>
            <svg viewBox="0 0 20 20">
              <path d="M6 15V4H10.2696C11.2087 4 12.0031 4.27767 12.6531 4.833C13.3023 5.389 13.627 6.06967 13.627 6.875C13.627 7.403 13.499 7.87167 13.243 8.281C12.9876 8.691 12.6252 9.014 12.1557 9.25V9.354C12.7081 9.53467 13.1534 9.861 13.4917 10.333C13.8306 10.8057 14 11.3407 14 11.938C14 12.8407 13.6648 13.5767 12.9943 14.146C12.3245 14.7153 11.4646 15 10.4148 15H6ZM8.05123 8.5H10.1243C10.5388 8.5 10.891 8.37167 11.1808 8.115C11.4713 7.85767 11.6165 7.54167 11.6165 7.167C11.6165 6.80567 11.4782 6.49667 11.2017 6.24C10.9251 5.98267 10.5866 5.854 10.186 5.854H8.05123V8.5ZM8.05123 13.104H10.3522C10.8356 13.104 11.2226 12.979 11.5131 12.729C11.8029 12.479 11.9478 12.1387 11.9478 11.708C11.9478 11.264 11.7992 10.9133 11.5021 10.656C11.205 10.3993 10.8008 10.271 10.2895 10.271H8.05123V13.104Z" fill="currentColor" />
            </svg>
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={handleItalicClick}>
            <svg viewBox="0 0 20 20">
              <path d="M5 16V14H7.375L10.562 6H8V4H15V6H12.729L9.521 14H12V16H5Z" fill="currentColor" />
            </svg>
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={handleStrikethroughClick}>
            <svg viewBox="0 0 20 20">
              <path d="M10.125 16C9.125 16 8.25 15.7083 7.5 15.125C6.75 14.5417 6.25 13.7707 6 12.812L7.688 12.125C7.91 12.833 8.23267 13.3677 8.656 13.729C9.08 14.0903 9.58367 14.271 10.167 14.271C10.7917 14.271 11.288 14.1217 11.656 13.823C12.024 13.5243 12.208 13.125 12.208 12.625C12.208 12.4023 12.1663 12.1973 12.083 12.01C11.9997 11.8227 11.8747 11.6527 11.708 11.5H13.854C13.9233 11.6527 13.9687 11.8157 13.99 11.989C14.0107 12.163 14.021 12.368 14.021 12.604C14.021 13.604 13.66 14.42 12.938 15.052C12.2153 15.684 11.2777 16 10.125 16ZM2 10V8.5H18V10H2ZM10 4C10.8887 4 11.6247 4.18733 12.208 4.562C12.7913 4.93733 13.2637 5.53467 13.625 6.354L12 7.062C11.8473 6.64533 11.594 6.30867 11.24 6.052C10.8853 5.79467 10.486 5.666 10.042 5.666C9.528 5.666 9.10067 5.791 8.76 6.041C8.42 6.291 8.236 6.61067 8.208 7H6.396C6.424 6.12467 6.778 5.40567 7.458 4.843C8.13867 4.281 8.986 4 10 4Z" fill="currentColor" />
            </svg>
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={handleUnderlineClick}>
            <svg viewBox="0 0 20 20">
              <path d="M4 17V15.5H16V17H4ZM10 14C8.69981 14 7.60329 13.566 6.71044 12.698C5.81759 11.83 5.37116 10.764 5.37116 9.5V3H7.42842V9.5C7.42842 10.1947 7.67838 10.785 8.1783 11.271C8.67821 11.757 9.28544 12 10 12C10.7146 12 11.3218 11.757 11.8217 11.271C12.3216 10.785 12.5716 10.1947 12.5716 9.5V3H14.6288V9.5C14.6288 10.764 14.1824 11.83 13.2896 12.698C12.3967 13.566 11.3002 14 10 14Z" fill="currentColor" />
            </svg>
          </button>
        </li>
      </ul>
    );
  },

};
export default toolbar;
