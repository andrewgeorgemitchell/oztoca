import { Pets } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '~/services/SanityClient';
import { DefaultTheme } from '~/styles/theme';
import CatCard from '../../components/CatCard/CatCard';

type CatsProps = {
  categories: Array<Record<any, any>>;
};

export async function getStaticProps() {
  const categories = await SanityClient.fetch(`*[_type == 'category']`);

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
}

const Cats: React.FC<CatsProps> = ({ categories }) => {
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

  const filteredCats = useMemo(
    () =>
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
        }),
    [cats, selectedCategory, selectedGender],
  );
  console.log(selectedCategory);
  return (
    <Layout
      title="View our Bobtail Cats"
      description="Full list of Bobtail cats & kittens from Oztoca"
    >
      <Box
        sx={{
          display: `grid`,
          marginTop: 5,
          marginBottom: 5,
          gridTemplateColumns: `auto`,
          gridTemplateRows: `auto`,
          gridTemplateAreas: `
      'sidebar'
      'content'
      `,
          paddingLeft: `2%`,
          paddingRight: `2%`,
          gap: 5,
          [DefaultTheme.breakpoints.up(`md`)]: {
            paddingLeft: `5%`,
            paddingRight: `5%`,
            marginTop: 4,
            marginBottom: 4,
            gridTemplateColumns: `300px auto`,
            gridTemplateRows: `650px auto`,
            gridTemplateAreas: `
          'sidebar content'
          'none content'
          `,
          },
        }}
      >
        <Grid
          sx={{
            '& > *': {
              flexBasis: `auto`,
            },
            gridArea: `sidebar`,
          }}
          container
          spacing={3}
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
              <FormLabel component="legend" color="info">
                Category
              </FormLabel>
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
        <Grid
          sx={{
            gridArea: `content`,
            gap: 2,
          }}
          container
          justifyContent="center"
          alignItems="flex-start"
        >
          {loading ? (
            <>
              <Grid item xs={12}>
                <CircularProgress size="lg" />
              </Grid>
            </>
          ) : (
            <>
              {filteredCats.length > 0 ? (
                filteredCats.map((cat: any) => (
                  <CatCard
                    key={cat._id}
                    name={cat.title}
                    imageUrl={cat.images[0].asset.url}
                    slug={cat.slug.current}
                  />
                ))
              ) : (
                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  style={{ alignSelf: `center`, gap: 10 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Pets sx={{ height: `50px`, width: `50px` }} />
                  <Typography variant="h5" align="center">
                    No Bobtails found matching this criteria, please try editing
                    the filter settings
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Cats;
