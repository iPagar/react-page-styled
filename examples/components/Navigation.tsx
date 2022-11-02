import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Link from 'next/link';
import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { ListItemIcon } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Navigation: React.FC = () => {
  return (
    <div>
      <div />
      <Divider />
      <Link passHref href="/docs">
        <ListItem component="a">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>

          <ListItemText primary={'Docs'} />
        </ListItem>
      </Link>
      <Link passHref href="https://github.com/react-page/react-page">
        <ListItem component="a">
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary={'Github'} />
        </ListItem>
      </Link>
      <Divider />

      <Link passHref href="/">
        <ListItem component="a">
          <ListItemText primary={'Demo'} />
        </ListItem>
      </Link>
      <Link passHref href="/readonly">
        <ListItem component="a">
          <ListItemText primary={'Read only'} />
        </ListItem>
      </Link>
      <Link passHref href="/empty">
        <ListItem component="a">
          <ListItemText primary={'Empty editor'} />
        </ListItem>
      </Link>

      <Link passHref href="/examples/reactadmin">
        <ListItem component="a">
          <ListItemText primary={'React Admin example'} />
        </ListItem>
      </Link>

      <Divider />
      <List>
        <Link passHref href="/old/demo">
          <ListItem component="a">
            <ListItemText primary={'Old demo (v0)'} />
          </ListItem>
        </Link>
        <Link passHref href="/old/fromhtml">
          <ListItem component="a">
            <ListItemText primary={'Old import-from-html-Demo'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem
          component="a"
          href={'https://ipagar.github.io/react-page-styled/'}
        >
          <ListItemText primary={'Latest version'} />
        </ListItem>
        <ListItem
          component="a"
          href={'https://ipagar.github.io/react-page-styled/beta'}
        >
          <ListItemText primary={'beta version'} />
        </ListItem>
      </List>
    </div>
  );
};

export default Navigation;
