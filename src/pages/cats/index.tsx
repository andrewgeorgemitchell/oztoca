import {
  Button,
  CircularProgress,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '~/services/SanityClient';
import { CustomTheme } from '~/styles/theme';
import CatCard from '../../components/CatCard/CatCard';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
    minHeight: `80vh`,
  },
  sidebar: {
    padding: 20,
    '& > *': {
      flexBasis: `auto`,
    },
    position: `sticky`,
    top: 0,
  },
}));

type CatsProps = {
  categories: Array<Record<any, any>>;
};

export async function getStaticProps() {
  const categories = await SanityClient.fetch(`*[_type == 'category']`);

  return {
    props: {
      categories,
    },
    revalidate: 10,
  };
}

const Cats: React.FC<CatsProps> = ({ categories }) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<Array<Record<any, any>>>([]);
  const queryParams = router.query;

  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.category,
  );
  const [selectedGender, setSelectedGender] = useState(``);

  useEffect(() => {
    const fetchCats = async () => {
      const catRes: Array<Record<any, any>> = await SanityClient.fetch(
        `*[_type == 'cat']{
          _id,
          title,
          slug,
          category->,
          images[]{
            asset->
          },
          sex,
        }`,
      );
      setCats(catRes);
      setLoading(false);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    setSelectedCategory(queryParams.category);
  }, [queryParams]);

  return (
    <Layout
      title="View our Bobtail Cats"
      description="Full list of Bobtail cats & kittens from Oztoca"
    >
      <Grid className={classes.root} container spacing={10}>
        <Grid
          className={classes.sidebar}
          container
          spacing={3}
          item
          xs={12}
          md={3}
          direction="column"
          wrap="nowrap"
          justifyContent="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h5">Filter:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup
                aria-label="Category"
                name="category-radio-filter-group"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                {categories.map((category: any) => (
                  <FormControlLabel
                    key={category._id}
                    value={category.slug.current}
                    control={<Radio />}
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender-radio-filter-group"
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              onClick={() => {
                setSelectedCategory(``);
                setSelectedGender(``);
              }}
              variant="outlined"
              fullWidth
            >
              Clear Filter Settings
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} item xs={12} md={9}>
          {loading ? (
            <>
              <Grid item xs={12}>
                <CircularProgress size="lg" />
              </Grid>
            </>
          ) : (
            cats
              .filter((cat) => {
                if (selectedCategory) {
                  return cat.category.slug.current === selectedCategory;
                }
                return true;
              })
              .filter((cat) => {
                if (selectedGender) {
                  return cat.sex === selectedGender;
                }
                return true;
              })
              .map((cat: any) => (
                <Fade key={cat._id} in timeout={500}>
                  <Grid item xs={12} md={6} lg={4}>
                    <CatCard
                      name={cat.title}
                      imageUrl={cat.images[0].asset.url}
                      slug={cat.slug.current}
                    />
                  </Grid>
                </Fade>
              ))
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cats;
