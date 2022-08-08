import React from 'react';
import { Config } from '../config';

export type ToolbarProps = {
  config: Config;
}
export const Toolbar: React.FC<ToolbarProps> = ({ config }) => {
  return (
    <div>
      <div>
        <div>elements:</div>
        <ul>
          {config.elements.map((element) => (
            <React.Fragment key={element.type}>
              <button>{element.type}</button>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};
