import { Card, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '~/services/SanityClient';
import { CustomTheme } from '~/styles/theme';
import Modal from '../components/Modal/Modal';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
  },
  card: {
    borderRadius: 10,
    boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.1)`,
    margin: `0 auto`,
    padding: theme.spacing(2),
    width: `100%`,
  },
}));

type GalleryProps = {
  gallery: any;
};

export async function getStaticProps() {
  const gallery = await SanityClient.fetch(`*[_type == 'gallery']{
  "imageUrl": image.asset->url,
  title,
  }`);

  return {
    props: {
      gallery,
    },
    revalidate: 10,
  };
}

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handleClick = (e: any) => {
    setOpen(!open);

    setSelectedPhoto(e.target.alt);
  };
  return (
    <Layout title="Gallery" description="Gallery">
      <Grid
        className={classes.root}
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ paddingTop: 16, paddingBottom: 16 }}
      >
        <Grid container item xs={12}>
          <Typography
            variant="h1"
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: `#333`,
              lineHeight: `1em`,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            The Awww Gallery
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {gallery.map((image: any) => (
            <Grid
              style={{ cursor: `pointer` }}
              item
              xs={6}
              md={4}
              lg={4}
              key={image.imageUrl}
              onClick={(e) => handleClick(e)}
            >
              {open && (
                <Modal
                  image={image}
                  handleClose={handleClick}
                  selectedPhoto={selectedPhoto}
                />
              )}
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  height="150"
                  image={image.imageUrl}
                  alt={image.title}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Gallery;
