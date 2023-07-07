import React, {  } from 'react';
import { Menu,  } from 'semantic-ui-react';

const Header = () => {
  
  return (
    <Menu stackable inverted size="massive">
      <Menu.Item header>
        <h1 style={{ color: '#2185D0' }}>Rater App</h1>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
