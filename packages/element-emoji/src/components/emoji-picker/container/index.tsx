import { CompactEmoji } from 'emojibase';
import React from 'react';
import { EmojiPicker } from '..';

type Props = {
  isOpened: boolean;
  searchString: string;
  children: React.ReactNode;
};

type State = {
  selectedEmoji: CompactEmoji | null;
};

export class EmojiPickerContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { selectedEmoji: null };
    this.selectEmoji = this.selectEmoji.bind(this);
  }

  render() {
    const { selectedEmoji } = this.state;
    const { isOpened, searchString, children } = this.props;
    return (
      <div>
        {selectedEmoji !== null ? (
          <span>{selectedEmoji.unicode}</span>
        ) : (
          children
        )}
        {isOpened && (
          <EmojiPicker
            searchString={searchString}
            selectEmoji={this.selectEmoji}
          />
        )}
      </div>
    );
  }

  selectEmoji(emoji: CompactEmoji) {
    this.setState({ selectedEmoji: emoji });
  }
}
