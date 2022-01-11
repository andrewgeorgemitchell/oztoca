import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
}));

type GalleryProps = {};

const Gallery: React.FC<GalleryProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Gallery" description="Gallery">
      <div className={classes.root}>
        <h3>Gallery</h3>``
      </div>
    </Layout>
  );
};

export default Gallery;
