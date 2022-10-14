import '@rmwc/switch/styles';
import {
  Switch as RMWCSwitch,
  SwitchHTMLProps as RMWCSwitchHTMLProps,
  SwitchProps as RMWCSwitchProps,
} from '@rmwc/switch';
import { styles } from './index.css';

type SwitchProps = RMWCSwitchProps & RMWCSwitchHTMLProps;

export const Switch: React.FC<SwitchProps> = (props) => {
  return <RMWCSwitch {...props} className={styles.root} />;
};
