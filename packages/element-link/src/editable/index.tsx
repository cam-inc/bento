import {
  Element,
  ElementContainer,
  helpers,
  EditIcon,
  Button,
  isUrl,
} from '@bento-editor/core';
import React, { useCallback, useState } from 'react';
import attributes, { Attributes } from '../attributes';
import { Link, Form, FormErrors } from '../components';
import { styles } from './index.css';

const editable: Element<Attributes>['editable'] = {
  defaultValue: [
    {
      type: 'format',
      text: '',
    },
  ],
  Component: (props) => {
    const href = props.element.attributes?.href ?? attributes.defaultValue.href;
    const target =
      props.element.attributes?.target ?? attributes.defaultValue.target;
    const placeholder =
      props.element.attributes?.placeholder ??
      attributes.defaultValue.placeholder;

    const setNodes = helpers.useTransformsSetNodes(props.element);

    const [openInNew, setOpenInNew] = useState(target === '_blank');
    const [newHref, setNewHref] = useState(href);
    const [showEdit, setShowEdit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [errors, setErrors] = useState<FormErrors | null>(null);

    const handleLinkMouseEnter = useCallback(() => {
      setShowEdit(true);
    }, []);

    const handleLinkMouseLeave = useCallback(() => {
      setShowEdit(!isHovering);
    }, [isHovering]);

    const handleLinkMouseOver = useCallback(() => {
      setIsHovering(true);
    }, []);

    const handleFormSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newHref !== undefined && isUrl(newHref)) {
          setNodes({
            attributes: {
              href: newHref,
              target: openInNew ? '_blank' : '_self',
            },
          });
        } else {
          setErrors({
            reason: 'Invalid url.',
            message: '有効なURLを入力してください。',
          });
        }

        if (isEditing) {
          setIsEditing(false);
        }

        if (showEdit) {
          setShowEdit(false);
        }
      },
      [setNodes, isEditing, isHovering, newHref, openInNew]
    );

    const handleTextboxChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewHref(event.target.value);

        if (event.target.value === '') {
          setErrors(null);
        }
      },
      []
    );

    const handleCheckboxChange = useCallback(() => {
      setOpenInNew((prevState) => !prevState);
    }, []);

    const handleEditButtonClick = useCallback(() => {
      setIsEditing(true);
    }, []);

    const handleFormButtonClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
      },
      []
    );

    return (
      <ElementContainer {...props}>
        <div contentEditable={false} className={styles.root}>
          {href != null && href !== '' && !isEditing ? (
            <div
              className={styles.linkContainer}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
              onMouseOver={handleLinkMouseOver}
            >
              <Link href={href} target={target} />
              {showEdit && (
                <>
                  <span
                    className={styles.spacer}
                    onClick={handleEditButtonClick}
                    role="button"
                  />
                  <span className={styles.editButton}>
                    <Button onClick={handleEditButtonClick}>
                      <span className={styles.editIcon}>
                        <EditIcon />
                      </span>
                      <span>編集</span>
                    </Button>
                  </span>
                </>
              )}
            </div>
          ) : (
            <Form
              handleFormSubmit={handleFormSubmit}
              handleTextboxChange={handleTextboxChange}
              handleCheckboxChange={handleCheckboxChange}
              handleButtonClick={handleFormButtonClick}
              labelValue="新しいタブで開く"
              switchChecked={openInNew}
              buttonValue={isEditing ? '保存する' : 'リンクを作成する'}
              textboxValue={newHref}
              placeholder={placeholder}
              buttonDisabled={newHref == null || newHref === ''}
              textboxFocus={isEditing}
              errors={errors}
            />
          )}
        </div>
      </ElementContainer>
    );
  },
};

export default editable;
