import { Card, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';
import Modal from '../components/Modal/Modal';
const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
  card: {
    borderRadius: 10,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    padding: theme.spacing(2),
    width: '100%',
  },
}));

type GalleryProps = {};

const images = [
  {
    title: '#1',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: '#2',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: '#3',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: '#4',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: '#5',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: '#6',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
];

const Gallery: React.FC<GalleryProps> = () => {
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
          <Card className={classes.card}>
            <Typography variant="h2" style={{ textAlign: 'center' }}>
              The Awww Gallery
            </Typography>
          </Card>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {images.map((image, index) => (
            <Grid
              style={{ cursor: 'pointer' }}
              item
              xs={6}
              md={4}
              lg={4}
              key={index}
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
                  image={image.src}
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
