/**
 * Currently, there are no type definitions in @emoji-mart/react, so we implement our own.
 */
import React from 'react';
import { styles } from './index.css';
import {
  CompactEmoji,
  fetchFromCDN,
  fetchMessages,
  MessagesDataset,
} from 'emojibase';

type EmojiPickerProps = {
  searchString: string;
  selectEmoji: (emoji: CompactEmoji) => void;
};
type EmojiPickerState = {
  emojis: CompactEmoji[];
  searchedEmojis: CompactEmoji[];
  messages: MessagesDataset | null;
};

type EmojiProps = {
  unicode: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

class Emoji extends React.PureComponent<EmojiProps> {
  constructor(props: EmojiProps) {
    super(props);
  }

  render() {
    const { onClick, unicode } = this.props;
    return (
      <button onClick={onClick}>
        <span>{unicode}</span>
      </button>
    );
  }
}

export class EmojiPicker extends React.PureComponent<
  EmojiPickerProps,
  EmojiPickerState
> {
  constructor(props: EmojiPickerProps) {
    super(props);

    this.state = { emojis: [], searchedEmojis: [], messages: null };
  }

  async componentDidMount() {
    const emojis = await fetchFromCDN<CompactEmoji[]>('en/compact.json');
    const messages = await fetchMessages('ja');
    this.setState({ emojis, messages });
  }

  async componentDidUpdate(prevProps: EmojiPickerProps) {
    const { searchString } = this.props;
    if (prevProps.searchString !== searchString) {
      const searchedEmojis = this.state.emojis.filter(
        (emoji) =>
          searchString !== '' &&
          emoji.tags?.some((tag) => tag.match(searchString))
      );
      this.setState({ searchedEmojis });
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {this.state.searchedEmojis.length > 0 ? (
          <>
            {this.state.searchedEmojis.map((emoji) => (
              <Emoji
                key={emoji.unicode}
                unicode={emoji.unicode}
                onClick={() => this.#handleEmojiSelect(emoji)}
              />
            ))}
          </>
        ) : (
          <>
            {this.state.messages?.groups.map((group) => (
              <div key={group.key}>
                <p>{group.message}</p>
                {this.state.emojis
                  .filter((emoji) => emoji.group === group.order)
                  .map((emoji) => (
                    <Emoji
                      key={emoji.unicode}
                      unicode={emoji.unicode}
                      onClick={() => this.#handleEmojiSelect(emoji)}
                    />
                  ))}
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  #handleEmojiSelect(emoji: CompactEmoji) {
    this.props.selectEmoji(emoji);
  }
}
