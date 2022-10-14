import { styles } from './index.css';

declare global {
  interface Window {
    embedly?: (
      type: string,
      options: string | Record<string, any>,
      cb?: (iframe: HTMLIFrameElement) => void
    ) => void;
  }
}

type WidgetProps = {
  href: string;
  title: string;
};

export const Card: React.FC<WidgetProps> = ({ href, title }) => {
  const url = !href.match(/:\/\//)
    ? `${document.location.protocol === 'https:' ? 'https' : 'http'}://${href}`
    : href;

  return (
    <>
      {href !== '' && title !== '' && (
        <a href={url} target="_blank" rel="noreferrer" className={styles.card}>
          <div className={styles.title}>{title}</div>
          <div>{url}</div>
        </a>
      )}
    </>
  );
};
