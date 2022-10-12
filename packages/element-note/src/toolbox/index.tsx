import React from 'react';
import { Element } from '@bento-editor/core';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 20 20">
        <path
          d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H18C18.55 0 19.021 0.195667 19.413 0.587C19.8043 0.979 20 1.45 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.021 15.8043 18.55 16 18 16H4L0 20Z"
          fill="currentColor"
        />
      </svg>
    );
  },
  Thumb: () => {
    return <img className={styles.thumb} alt="注釈" src="data:image/png;base64,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gXlVRjpgbf73NyuXDk2vALdWmtFabYpV0MSDYpxST0296lfsXzafCiFn+szV0mB531wgAwRu13XatNyJZdd0bWQyAJxlSlyH220KvG5MhqEZrwhbADBD4BaB+lAtQ1dhq9cEAJihSblILJqXaUYGgG6gD7dwdHnPvhec++RDlyldt6vLiHQNMADAGoFbSApbhW4n19Ymqapdsa48KxUAoBsI3EKLwfvhvtYrXlW0y3w1u/waghYAuo/APW0odOOiyTI+HZ+cNEPhqnvZajCUBl/prj9FvisRAJx9CFwAAAxwHS4AABYIXAAADBC4AAAYIHABADBA4AIAYIDABQDAAIELAIABAhcAAAMELgAABghcAAAMELgAABggcAEAMEDgAgBggMAFAMAAgQsAgAECFwAAAwQuAAAGCFwAAAwQuAAAGCBwAQAwQOACAGCAwAUAwACBCwCAAQIXAAADBC4AAAYIXAAADBC4AAAY6Cl5DgAA5KlEhQsAgAECFwAAAwQuAAAGCFwAAAwQuAAAGCBwAQAwQOACAGCAwAUAwACBCwCAAQIXAAADBC4AAAYIXAAADBC4AAAYIHABADBA4AIAYIDABQDAAIELAIABAhcAAAMELgAABghcAAAMELgAABggcAEAMEDgAgBggMAFAMAAgQsAgAECFwAAAwQuAAAGCFwAAAwQuAAAGCBwAQAwQOACAGCAwAUAwACBCwCAAQIXAAADBC4AAAYIXAAADBC4AAAYIHABADBA4AIAYIDABQDAAIELAIABAhcAAAMELgAABghcAAAMELgAABggcAEAMEDgAgBggMAFAMAAgQsAgAECFwAAAwQuAAAGCFwAAAwQuAAAGCBwAQAwQOACAGCAwAUAwACBCwCAAQIXAAADBC4AAAYIXAAADBC4AAAYIHABADBA4AIAYIDABQDAAIELAIABAhcAAAMELgAABghcAAAMELgAABggcAEAMKDAHXcAACBP4wrcvQ4AAORprwJ32AEAgDztUuA+5wAAQF5Kfnmup1QqLfQPRv2y0AEAgKwpcPvO6enp0aCpxxwAAMjDo8raHj3yVe6lrlzlAgCA7Ki6HfSBGwZNOT3wX/7OAQCArChsf1TJWNdT/W65L/cVvww4AADQqT1+ubrSdTs501TlG+sdTcsAAHRKWXpzDFuZMrVjpez9qiN0AQBolzL0q7EpOeqp95OVQVTbHM3LAACkpT7bWNnurf3PujcvqPzgVa48kKrkAADATMIAKVfus91b7wd6mj5Dudq9zy+b0v4OAABnAYVsnMviR42CNkodnpVRzLf75Sa/DPnlUsfsVACAs4sCdq9fdvnleb/8PDkwaia/AVjIP+J4/qYLAAAAAElFTkSuQmCC" />
  },
  title: '注釈',
  description: '注釈文を作成します',
};

export default toolbox;
