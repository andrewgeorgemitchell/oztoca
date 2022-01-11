import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '~/services/SanityClient';

const useStyles = makeStyles({
  root: {},
});

type CatPageProps = {
  cat: any;
  slug: string;
};

export async function getStaticPaths() {
  const cats = await SanityClient.fetch(`*[_type == "cat"]{
    _id,
    slug,
  }`);

  const paths = cats.map(({ slug }: any) => ({
    params: { id: slug.current },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const cat = await SanityClient.fetch(
    `*[_type == "cat" && slug.current == "${params.id}"]`,
  );

  return { props: { cat } };
}

const CatPage: React.FC<CatPageProps> = ({ cat }) => {
  const classes = useStyles();
  const router = useRouter();
  const queryParams = router.query;

  console.log(`cat:`, cat);
  return (
    <Layout title={cat.title} description={cat.title}>
      <div className={classes.root}>
        <h3>CatPage</h3>
      </div>
    </Layout>
  );
};

export default CatPage;
