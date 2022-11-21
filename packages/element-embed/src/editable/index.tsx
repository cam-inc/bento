import { useCallback, useState, useEffect, useRef } from 'react';
import { Element, ElementContainer, helpers, isUrl } from '@bento-editor/core';
import attributes, { Attributes } from '../attributes';
import { Form, FormErrors, Card } from '../components';
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
    const title =
      props.element.attributes?.title ?? attributes.defaultValue.title;
    const placeholder =
      props.element.attributes?.placeholder ??
      attributes.defaultValue.placeholder;

    const setNodes = helpers.useTransformsSetNodes(props.element);

    const [newHref, setNewHref] = useState(href);
    const [embedTitle, setEmbedTitle] = useState(title);
    const [errors, setErrors] = useState<FormErrors | null>(null);

    const embedlyRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
      // @see https://docs.embed.ly/reference/platformjs#install
      const embedlyScript = document.createElement('script');
      embedlyScript.innerHTML = `(function(w, d){
var id='embedly-platform', n = 'script';
 if (!d.getElementById(id)){
   w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
   var e = d.createElement(n); e.id = id; e.async=1;
   e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
   var s = d.getElementsByTagName(n)[0];
   s.parentNode.insertBefore(e, s);
 }
})(window, document);`;
      document.body.appendChild(embedlyScript);

      return () => {
        document.body.removeChild(embedlyScript);
      };
    }, []);

    useEffect(() => {
      if (typeof window.embedly !== 'undefined') {
        window.embedly('on', 'card.rendered', (iframe) => {
          if (iframe.contentWindow !== null) {
            const { body } = iframe.contentWindow.document;
            const title =
              body.querySelector('.title')?.firstChild?.firstChild
                ?.textContent ||
              body.querySelector('.provider-name')?.firstChild?.textContent;
            setEmbedTitle(title ?? '');
          }

          iframe.style.display = 'none';
        });
      }
    }, [typeof window.embedly]);

    useEffect(() => {
      if (
        embedlyRef.current !== null &&
        typeof window.embedly !== 'undefined' &&
        href !== ''
      ) {
        window.embedly('card', embedlyRef.current);
      }
    }, [typeof window.embedly, embedlyRef, href]);

    const handleTextboxChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewHref(event.target.value);

        if (event.target.checkValidity()) {
          setErrors(null);
        }
      },
      []
    );

    const handleFormButtonClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (
          newHref !== undefined &&
          isUrl(newHref) &&
          embedTitle !== undefined
        ) {
          setNodes({
            attributes: {
              href: newHref,
              title: embedTitle,
            },
          });
        } else {
          setErrors({
            reason: 'Invalid url.',
            message: '有効なURLを入力してください。',
          });
        }
      },
      [setNodes, newHref, embedTitle]
    );

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    // The click event will be called for the second time.
    // Emitting this for doing setNodes without re-rendering recursively.
    useEffect(() => {
      if (embedTitle != null && embedTitle !== '') {
        buttonRef.current?.dispatchEvent(
          new Event('click', { cancelable: true, bubbles: true })
        );
      }
    }, [buttonRef, embedTitle]);

    return (
      <ElementContainer {...props}>
        <div contentEditable={false}>
          {href != null && href !== '' && <a ref={embedlyRef} href={href} />}
          {href != null && href !== '' && title != null && title !== '' ? (
            <div className={styles.widgetContainer}>
              <Card href={href} title={title} />
            </div>
          ) : (
            <Form
              handleTextboxChange={handleTextboxChange}
              handleButtonClick={handleFormButtonClick}
              labelValue="PDF、Googleドライブ、Googleマップ、CodePenなどのリンクが使えます"
              buttonValue="リンクを埋め込む"
              placeholder={placeholder}
              buttonDisabled={newHref == null || newHref === ''}
              errors={errors}
              buttonRef={buttonRef}
            />
          )}
        </div>
      </ElementContainer>
    );
  },
};

export default editable;
