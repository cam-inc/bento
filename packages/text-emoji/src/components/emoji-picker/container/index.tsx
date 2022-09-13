import React, { useState, useCallback } from 'react';
import { EmojiPicker } from '..';

type Props = {
  isOpened: boolean;
  searchString: string;
  children: React.ReactNode;
};

export const EmojiPickerContainer: React.FC<Props> = ({
  isOpened,
  searchString,
  children,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<any | null>(null);

  const selectEmoji = useCallback((emoji: any) => {
    setSelectedEmoji(emoji);
  }, []);

  return (
    <div>
      {selectedEmoji !== null ? <span>selectedEmoji.unicode</span> : children}
      {isOpened && (
        <EmojiPicker searchString={searchString} selectEmoji={selectEmoji} />
      )}
    </div>
  );
};
