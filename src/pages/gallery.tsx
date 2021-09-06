import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
type GalleryProps = {};

const Gallery: React.FC<GalleryProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Gallery" description="Pictures of Cats">
      <div className={classes.root}>
        <Typography variant="h3">Gallery</Typography>
      </div>
    </Layout>
  );
};

export default Gallery;
