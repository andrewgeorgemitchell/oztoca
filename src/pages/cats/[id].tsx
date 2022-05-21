import { Card, Chip, Divider, Fade, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PortableText } from '@portabletext/react';
import { useRouter } from 'next/router';
import React from 'react';
import CatCard from '~/components/CatCard/CatCard';
import ContactForm from '~/components/ContactForm/ContactForm';
import Layout from '~/components/Layout/Layout';
import { SanityImage } from '~/components/SanityImage';
import { SanityClient } from '~/services/SanityClient';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    padding: 20,
    ...theme.mixins.containerStyles(theme),
    display: `grid`,
    gap: 20,
    gridTemplateColumns: `auto`,
    gridTemplateRows: `300px auto auto`,
    gridTemplateAreas: `
    "image"
    "content"
    "contactForm"
    `,
    [theme.breakpoints.up(`md`)]: {
      paddingLeft: `10%`,
      paddingRight: `10%`,
      gridTemplateColumns: `400px 1fr`,
      gridTemplateRows: `300px 1fr`,
      gridTemplateAreas: `
      "image content"
      "contactForm content"
      `,
    },
  },
  imageCont: {
    gridArea: `image`,
    margin: `auto`,
  },
  contentCont: {
    gridArea: `content`,
    padding: 10,
    [theme.breakpoints.up(`md`)]: {
      padding: 20,
    },
  },
  contactFormCont: {
    gridArea: `contactForm`,
    padding: 10,
    [theme.breakpoints.up(`md`)]: {
      padding: 20,
    },
  },
  relatedCatCont: {
    paddingBottom: 20,
    ...theme.mixins.containerStyles(theme),
  },
  relatedCatFlex: {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `center`,
    gap: 10,
    [theme.breakpoints.up(`md`)]: {
      justifyContent: `flex-start !important`,
    },
  },
}));

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
  const classes = useStyles();
  const router = useRouter();

  return (
    <Layout title={cat.title} description={cat.title}>
      <div className={classes.root}>
        <div className={classes.imageCont}>
          <SanityImage
            src={cat.images[0].asset.url}
            alt={cat.title}
            height={300}
            width={400}
          />
        </div>
        <Card className={classes.contentCont}>
          <Typography variant="h5">{cat.title}</Typography>
          <div
            style={{
              display: `flex`,
              gap: 10,
              marginTop: 12,
              marginBottom: 12,
            }}
          >
            <Chip color="secondary" label={`Category: ${cat.category.name}`} />
            <Chip color="secondary" label={`Age: ${cat.age}`} />
            <Chip color="secondary" label={`Sex: ${cat.sex}`} />
          </div>
          <Divider />
          <PortableText value={cat.description} />
        </Card>
        <Card className={classes.contactFormCont}>
          <Typography variant="h5" align="center" gutterBottom>
            Interested in adopting this bobtail?
          </Typography>
          <Typography variant="subtitle1" align="center" paragraph>
            Please fill out this form and we will get reach out to you with the
            adoption details.
          </Typography>
          <ContactForm src={router.asPath} />
        </Card>
      </div>
      <div className={classes.relatedCatCont}>
        <Typography variant="h4" paragraph>
          Related Bobtails:
        </Typography>
        <div className={classes.relatedCatFlex}>
          {relatedCats.slice(0, 3).map((relatedCat: any) => (
            <Fade key={relatedCat._id} in timeout={500}>
              <CatCard
                name={relatedCat.title}
                imageUrl={relatedCat.images[0].asset.url}
                slug={relatedCat.slug.current}
              />
            </Fade>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CatPage;
