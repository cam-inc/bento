import React from 'react';
import '@rmwc/switch/styles';
import { Switch, SwitchHTMLProps, SwitchProps } from '@rmwc/switch';
import { styles } from './index.css';

type BentoSwitchProps = SwitchProps & SwitchHTMLProps;

export const BentoSwitch: React.FC<BentoSwitchProps> = (props) => {
  return <Switch {...props} className={styles.root} />;
};
