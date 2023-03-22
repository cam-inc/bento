import {
  Element,
  ElementContainer,
  helpers,
  EditIcon,
  Button,
  isUrl,
} from '@bento-editor/core';
import { useCallback, useEffect, useState } from 'react';
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

    const handleEditButtonClick = useCallback(() => {
      setIsEditing(true);
    }, []);

    const handleFormButtonClick = useCallback<
      React.ComponentProps<typeof Form>['handleButtonClick']
    >(
      (href, openInNew) => {
        if (isUrl(href)) {
          setNodes({
            attributes: {
              href: href,
              target: openInNew ? '_blank' : '_self',
            },
          });
          setIsEditing(false);
        } else {
          setErrors({
            reason: 'Invalid url.',
            message: '有効なURLを入力してください。',
          });
        }
      },
      [setNodes, isEditing, isHovering]
    );

    useEffect(() => {
      if (!href) {
        setIsEditing(true);
      }
    }, []);

    return (
      <ElementContainer {...props}>
        <div contentEditable={false} className={styles.root}>
          {href != null && href !== '' && !isEditing ? (
            <div
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
              onMouseOver={handleLinkMouseOver}
            >
              <Link href={href} target={target} />
              {showEdit && (
                <span className={styles.editButton}>
                  <span
                    className={styles.spacer}
                    onClick={handleEditButtonClick}
                    role="button"
                  />
                  <Button onClick={handleEditButtonClick}>
                    <span className={styles.editIcon}>
                      <EditIcon />
                    </span>
                    <span>編集</span>
                  </Button>
                </span>
              )}
            </div>
          ) : (
            <Form
              handleButtonClick={handleFormButtonClick}
              labelValue="新しいタブで開く"
              buttonValue={isEditing ? '保存する' : 'リンクを作成する'}
              href={href}
              openInNew={target === '_blank'}
              placeholder={placeholder}
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
