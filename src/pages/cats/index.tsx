import {
  Button,
  Divider,
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
  },
  sidebar: {
    padding: 20,
    '& > *': {
      flexBasis: `auto`,
    },
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
  };
}

const Cats: React.FC<CatsProps> = ({ categories }) => {
  const classes = useStyles();
  const router = useRouter();
  const queryParams = router.query;

  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.category,
  );
  const [selectedGender, setSelectedGender] = useState(``);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  console.log(`cats:`, cats);

  const fetchCats = async (): Promise<void> => {
    setLoading(true);
    const newCats: any = await SanityClient.fetch(
      `*[_type == 'cat']{
        _id,
        title,
        slug,
        images[]{
          asset->
        }
      }`,
    );
    setCats(newCats);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Layout
      title="View our Bobtail Cats"
      description="Full list of Bobtail cats & kittens from Oztoca"
    >
      <div className={classes.root}>
        <Grid container spacing={10}>
          <Grid
            className={classes.sidebar}
            container
            spacing={1}
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
                  defaultValue={selectedCategory ?? ``}
                  name="radio-buttons-group"
                >
                  {categories.map((category: any) => (
                    <FormControlLabel
                      key={category._id}
                      value={category.name}
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
                  defaultValue=""
                  name="radio-buttons-group"
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
            {cats.map((cat: any) => (
              <Grid item xs={12} md={6} lg={4} key={cat._id}>
                <CatCard
                  name={cat.title}
                  imageUrl={cat.images[0].asset.url}
                  slug={cat.slug.current}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Cats;
