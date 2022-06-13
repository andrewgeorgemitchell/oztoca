import { Box, Card, Dialog, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityImage } from '~/components/SanityImage';
import { SanityClient } from '~/services/SanityClient';
import { DefaultTheme } from '~/styles/theme';

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
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const handleSelect = (image: any) => {
    setOpen(true);
    setSelectedPhoto(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout title="Gallery" description="Gallery">
      <Grid
        sx={{
          width: `100% !important`,
          paddingLeft: `2%`,
          paddingRight: `2%`,
          marginTop: `30px !important`,
        }}
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ paddingTop: 16, paddingBottom: 16 }}
      >
        <Typography variant="h4" align="center" paragraph>
          The Awww Gallery
        </Typography>
        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(1, 1fr)`,
            gap: 2.5,
            [DefaultTheme.breakpoints.up(`sm`)]: {
              gridTemplateColumns: `repeat(2, 1fr)`,
            },
            [DefaultTheme.breakpoints.up(`md`)]: {
              gridTemplateColumns: `repeat(3, 1fr)`,
            },
            [DefaultTheme.breakpoints.up(`lg`)]: {
              gridTemplateColumns: `repeat(4, 1fr)`,
            },
            [DefaultTheme.breakpoints.up(`xl`)]: {
              gridTemplateColumns: `repeat(5, 1fr)`,
            },
          }}
        >
          {gallery.map((image: any) => (
            <Card
              key={image.imageUrl}
              onClick={() => handleSelect(image)}
              sx={{
                borderRadius: 2,
                margin: `0 auto`,
                height: 225,
                width: 337,
                cursor: `pointer`,
              }}
            >
              <SanityImage
                height={225}
                width={337}
                src={image.imageUrl}
                alt={image.title}
              />
            </Card>
          ))}
        </Box>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        {selectedPhoto && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              style={{ maxHeight: `85vh` }}
              src={`${selectedPhoto.imageUrl}?format=auto`}
              alt={selectedPhoto.title}
            />
            <Typography
              variant="h4"
              align="center"
              style={{ background: `#fff`, padding: 10 }}
            >
              {selectedPhoto.title}
            </Typography>
          </>
        )}
      </Dialog>
    </Layout>
  );
};

export default Gallery;
