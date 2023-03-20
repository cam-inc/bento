import {
  helpers,
  Text,
  usePopover,
  Popover,
  ButtonBox,
  isUrl,
} from '@bento-editor/core';
import { useCallback, useState } from 'react';
import attributes, { Attributes } from '../attributes';
import { ColorPicker, Form, FormErrors } from '../components';
import { styles } from './index.css';

const toolbar: Text<Attributes>['toolbar'] = {
  Component: ({ editor }) => {
    const createHandler = useCallback((format: keyof Attributes) => {
      return () => {
        const marks = Object.assign(
          {},
          helpers.Editor.marks(editor)?.attributes
        );

        if (helpers.isMarkActive(editor, format)) {
          delete marks[format];
        } else {
          marks[format] = true;
        }

        helpers.Transforms.setNodes(
          editor,
          {
            attributes: marks,
          },
          { match: (n) => helpers.Text.isText(n), split: true }
        );
      };
    }, []);

    const handleBoldClick = createHandler('bold');
    const handleItalicClick = createHandler('italic');
    const handleStrikethroughClick = createHandler('strikethrough');
    const handleUnderlineClick = createHandler('underline');

    const popoverLink = usePopover<HTMLLIElement>();
    const handleLinkClick = useCallback(() => {
      popoverLink.open();
    }, [popoverLink]);

    const [openInNew, setOpenInNew] = useState(
      attributes.defaultValue.target !== undefined
        ? attributes.defaultValue.target === '_blank'
        : true
    );
    const [href, setHref] = useState(attributes.defaultValue.href ?? '');
    const [errors, setErrors] = useState<FormErrors | null>(null);

    const handleFormTextboxChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setHref(event.target.value);

        if (event.target.checkValidity()) {
          setErrors(null);
        }
      },
      []
    );
    const handleFormSwitchChange = useCallback(() => {
      setOpenInNew((prevState) => !prevState);
    }, []);
    const handleFormButtonClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (href !== undefined && isUrl(href)) {
          helpers.Transforms.setNodes(
            editor,
            {
              attributes: {
                href,
                target: openInNew ? '_blank' : '_self',
              },
            },
            { match: (n) => helpers.Text.isText(n), split: true }
          );
          popoverLink.close();
        } else {
          setErrors({
            reason: 'Invalid url.',
            message: '有効なURLを入力してください。',
          });
        }
      },
      [editor, href, openInNew, popoverLink]
    );

    const popoverColor = usePopover<HTMLLIElement>();
    const handleColorClick = useCallback(() => {
      popoverColor.open();
    }, [popoverColor]);

    const [color] = useState(attributes.defaultValue.color ?? '#ffffff');
    const handleColorChange = useCallback(
      (newColor: string) => {
        helpers.Transforms.setNodes(
          editor,
          {
            attributes: {
              color: newColor,
            },
          },
          { match: (n) => helpers.Text.isText(n), split: true }
        );
        // popoverColor.close();
      },
      [popoverColor]
    );

    return (
      <>
        <ul className={styles.list}>
          <li ref={popoverLink.targetRef} className={styles.link}>
            <ButtonBox
              name="リンク"
              featureIcon={
                <svg viewBox="0 0 20 20">
                  <path
                    d="M9.5 18C8.222 18 7.15267 17.545 6.292 16.635C5.43067 15.7257 5 14.639 5 13.375V5.271C5 4.36833 5.316 3.59733 5.948 2.958C6.58 2.31933 7.34733 2 8.25 2C9.18067 2 9.955 2.33667 10.573 3.01C11.191 3.684 11.5 4.47933 11.5 5.396V13.021C11.5 13.5763 11.302 14.045 10.906 14.427C10.51 14.809 10.0413 15 9.5 15C8.91667 15 8.43733 14.7917 8.062 14.375C7.68733 13.9583 7.5 13.4723 7.5 12.917V5H9V13.021C9 13.1597 9.04867 13.2777 9.146 13.375C9.24333 13.4723 9.36133 13.521 9.5 13.521C9.63867 13.521 9.75667 13.4723 9.854 13.375C9.95133 13.2777 10 13.1597 10 13.021V5.271C10 4.785 9.83 4.36833 9.49 4.021C9.14933 3.67367 8.736 3.5 8.25 3.5C7.764 3.5 7.35067 3.677 7.01 4.031C6.67 4.385 6.5 4.812 6.5 5.312V13.521C6.5 14.3543 6.795 15.059 7.385 15.635C7.97567 16.2117 8.68067 16.5 9.5 16.5C10.3613 16.5 11.0767 16.1943 11.646 15.583C12.2153 14.9723 12.5 14.2503 12.5 13.417V5H14V13.521C14 14.771 13.566 15.83 12.698 16.698C11.83 17.566 10.764 18 9.5 18Z"
                    fill="currentColor"
                  />
                </svg>
              }
              onClick={handleLinkClick}
            />
          </li>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handleBoldClick}
            >
              <svg viewBox="0 0 20 20">
                <path
                  d="M6 15V4H10.2696C11.2087 4 12.0031 4.27767 12.6531 4.833C13.3023 5.389 13.627 6.06967 13.627 6.875C13.627 7.403 13.499 7.87167 13.243 8.281C12.9876 8.691 12.6252 9.014 12.1557 9.25V9.354C12.7081 9.53467 13.1534 9.861 13.4917 10.333C13.8306 10.8057 14 11.3407 14 11.938C14 12.8407 13.6648 13.5767 12.9943 14.146C12.3245 14.7153 11.4646 15 10.4148 15H6ZM8.05123 8.5H10.1243C10.5388 8.5 10.891 8.37167 11.1808 8.115C11.4713 7.85767 11.6165 7.54167 11.6165 7.167C11.6165 6.80567 11.4782 6.49667 11.2017 6.24C10.9251 5.98267 10.5866 5.854 10.186 5.854H8.05123V8.5ZM8.05123 13.104H10.3522C10.8356 13.104 11.2226 12.979 11.5131 12.729C11.8029 12.479 11.9478 12.1387 11.9478 11.708C11.9478 11.264 11.7992 10.9133 11.5021 10.656C11.205 10.3993 10.8008 10.271 10.2895 10.271H8.05123V13.104Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handleItalicClick}
            >
              <svg viewBox="0 0 20 20">
                <path
                  d="M5 16V14H7.375L10.562 6H8V4H15V6H12.729L9.521 14H12V16H5Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handleStrikethroughClick}
            >
              <svg viewBox="0 0 20 20">
                <path
                  d="M10.125 16C9.125 16 8.25 15.7083 7.5 15.125C6.75 14.5417 6.25 13.7707 6 12.812L7.688 12.125C7.91 12.833 8.23267 13.3677 8.656 13.729C9.08 14.0903 9.58367 14.271 10.167 14.271C10.7917 14.271 11.288 14.1217 11.656 13.823C12.024 13.5243 12.208 13.125 12.208 12.625C12.208 12.4023 12.1663 12.1973 12.083 12.01C11.9997 11.8227 11.8747 11.6527 11.708 11.5H13.854C13.9233 11.6527 13.9687 11.8157 13.99 11.989C14.0107 12.163 14.021 12.368 14.021 12.604C14.021 13.604 13.66 14.42 12.938 15.052C12.2153 15.684 11.2777 16 10.125 16ZM2 10V8.5H18V10H2ZM10 4C10.8887 4 11.6247 4.18733 12.208 4.562C12.7913 4.93733 13.2637 5.53467 13.625 6.354L12 7.062C11.8473 6.64533 11.594 6.30867 11.24 6.052C10.8853 5.79467 10.486 5.666 10.042 5.666C9.528 5.666 9.10067 5.791 8.76 6.041C8.42 6.291 8.236 6.61067 8.208 7H6.396C6.424 6.12467 6.778 5.40567 7.458 4.843C8.13867 4.281 8.986 4 10 4Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handleUnderlineClick}
            >
              <svg viewBox="0 0 20 20">
                <path
                  d="M4 17V15.5H16V17H4ZM10 14C8.69981 14 7.60329 13.566 6.71044 12.698C5.81759 11.83 5.37116 10.764 5.37116 9.5V3H7.42842V9.5C7.42842 10.1947 7.67838 10.785 8.1783 11.271C8.67821 11.757 9.28544 12 10 12C10.7146 12 11.3218 11.757 11.8217 11.271C12.3216 10.785 12.5716 10.1947 12.5716 9.5V3H14.6288V9.5C14.6288 10.764 14.1824 11.83 13.2896 12.698C12.3967 13.566 11.3002 14 10 14Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </li>
          <li ref={popoverColor.targetRef} className={styles.color}>
            <ButtonBox
              featureIcon={
                <svg viewBox="0 0 20 20">
                  <path
                    d="M1.625 17.5V14.083H18.375V17.5H1.625ZM4.562 11.667L8.938 0H11.062L15.438 11.667H13.354L12.333 8.771H7.667L6.646 11.667H4.562ZM8.292 7H11.708L10.042 2.312H9.958L8.292 7Z"
                    fill="currentColor"
                  />
                </svg>
              }
              onClick={handleColorClick}
            />
          </li>
        </ul>
        <Popover {...popoverLink.bind}>
          <Form
            handleTextboxChange={handleFormTextboxChange}
            handleSwitchChange={handleFormSwitchChange}
            handleButtonClick={handleFormButtonClick}
            labelValue="新しいタブで開く"
            switchChecked={openInNew}
            buttonValue="リンクを作成する"
            textboxValue={href}
            placeholder="URLを入力・貼り付け"
            buttonDisabled={href === ''}
            textboxFocus={true}
            errors={errors}
          />
        </Popover>
        <Popover {...popoverColor.bind}>
          <ColorPicker color={color} onChange={handleColorChange} />
        </Popover>
      </>
    );
  },
};
export default toolbar;
