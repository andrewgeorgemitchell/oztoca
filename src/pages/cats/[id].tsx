import {
  ChevronLeft,
  ChevronRight,
  FiberManualRecord,
} from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { PortableText } from '@portabletext/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CatCard from '~/components/CatCard/CatCard';
import ContactForm from '~/components/ContactForm/ContactForm';
import Layout from '~/components/Layout/Layout';
import { SanityImage } from '~/components/SanityImage';
import { SanityClient } from '~/services/SanityClient';
import { DefaultTheme } from '~/styles/theme';

type CatPageProps = {
  cat: any;
  slug: string;
  relatedCats: Array<Record<any, any>>;
};

export async function getStaticPaths() {
  const cats = await SanityClient.fetch(`*[_type == "cat"]{
    _id,
    slug,
  }`);

  const paths = cats.map(({ slug }: any) => ({
    params: { id: slug.current },
  }));

  return { paths, fallback: `blocking` };
}

export async function getStaticProps({ params }: any) {
  const [cat] = await SanityClient.fetch(
    `*[_type == "cat" && slug.current == "${params.id}"]{
      _id,
      title,
      description,
      category->,
      images[]{
        asset->
      },
      sex,
      age,
    }`,
  );
  const relatedCats = (
    await SanityClient.fetch(
      `*[_type == "cat"] {
        _id,
        title,
        slug,
        description,
        category->,
        images[]{
          asset->
        },
        sex,
        age,
      }`,
    )
  )
    .filter((relatedCat: any) => relatedCat.category.name === cat.category.name)
    .filter((relatedCat: any) => relatedCat._id !== cat._id);

  return { props: { cat, relatedCats }, revalidate: 10 };
}

const CatPage: React.FC<CatPageProps> = ({ cat, relatedCats }) => {
  const router = useRouter();

  const [currentGalleryImg, setCurrentGalleryImg] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryImg((curr) =>
        curr >= cat.images.length - 1 ? 0 : curr + 1,
      );
    }, 7.5 * 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={cat.title} description={cat.title}>
      <Box
        sx={{
          padding: 2,
          width: `100% !important`,
          paddingLeft: `2%`,
          paddingRight: `2%`,
          display: `grid`,
          gap: 3,
          gridTemplateColumns: `auto`,
          gridTemplateRows: `340px auto auto`,
          gridTemplateAreas: `
        "image"
        "content"
        "contactForm"
        `,
          [DefaultTheme.breakpoints.up(`md`)]: {
            paddingLeft: `17%`,
            paddingRight: `17%`,
            gridTemplateColumns: `400px 1fr`,
            gridTemplateRows: `340px 1fr`,
            gridTemplateAreas: `
          "image content"
          "contactForm content"
          `,
          },
        }}
      >
        <Box
          sx={{
            gridArea: `image`,
            height: `100%`,
            background: `#fff`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
          }}
        >
          <SanityImage
            src={cat.images[currentGalleryImg].asset.url}
            alt={cat.title}
            height={300}
            width={400}
          />
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            <IconButton
              size="small"
              onClick={() => {
                setCurrentGalleryImg((curr) => curr - 1);
              }}
              disabled={currentGalleryImg === 0}
            >
              <ChevronLeft />
            </IconButton>
            {cat.images.map((image: any, i: number) => (
              <IconButton
                key={image.asset.url}
                size="small"
                color={
                  image.asset.url === cat.images[currentGalleryImg].asset.url
                    ? `secondary`
                    : `default`
                }
                onClick={() => setCurrentGalleryImg(i)}
              >
                <FiberManualRecord />
              </IconButton>
            ))}
            <IconButton
              size="small"
              onClick={() => setCurrentGalleryImg((curr) => curr + 1)}
              disabled={currentGalleryImg === cat.images.length - 1}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
        <Card
          sx={{
            gridArea: `content`,
            padding: 2,
            [DefaultTheme.breakpoints.up(`md`)]: {
              padding: 3,
            },
          }}
        >
          <Typography variant="h5">{cat.title}</Typography>
          <Box
            sx={{
              display: `flex`,
              gap: 1,
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Chip color="error" label={`Category: ${cat.category.name}`} />
            <Chip color="error" label={`Age: ${cat.age}`} />
            <Chip color="error" label={`Sex: ${cat.sex}`} />
          </Box>
          <Divider />
          <PortableText value={cat.description} />
        </Card>
        <Card
          sx={{
            paddingBottom: 2,
            width: `100%`,
            paddingLeft: `2%`,
            paddingRight: `2%`,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Interested in adopting this bobtail?
          </Typography>
          <Typography variant="subtitle1" align="center" paragraph>
            Please fill out this form and we will get reach out to you with the
            adoption details.
          </Typography>
          <ContactForm src={router.asPath} />
        </Card>
      </Box>
      <Box
        sx={{
          paddingBottom: 2,
          width: `100% !important`,
          paddingLeft: `17%`,
          paddingRight: `17%`,
        }}
      >
        <Typography variant="h4" paragraph>
          Related Bobtails:
        </Typography>
        <Box
          sx={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `center`,
            gap: 1,
            [DefaultTheme.breakpoints.up(`md`)]: {
              justifyContent: `flex-start !important`,
            },
          }}
        >
          {relatedCats.slice(0, 3).map((relatedCat: any) => (
            <CatCard
              name={relatedCat.title}
              imageUrl={relatedCat.images[0].asset.url}
              slug={relatedCat.slug.current}
              key={relatedCat._id}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default CatPage;
