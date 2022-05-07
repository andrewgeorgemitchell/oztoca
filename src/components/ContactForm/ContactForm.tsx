import { Button, Grid, makeStyles } from '@material-ui/core';
import { FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
}));

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = () => {
  const classes = useStyles();
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: send form data to backend
    // TODO: show success message
    // TODO: handle error message

    console.log(formValues);
    setFormValues(defaultValues);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            error={formValues.name === ''}
            helperText={'Name is required'}
            required

          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <TextField
            id="phone-input"
            name="phone"
            label="phone"
            type="number"
            value={formValues.phone}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <TextField
            id="subject-input"
            name="subject"
            label="Subject"
            type="text"
            value={formValues.subject}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth={true}>
          <TextField
            id="message-input"
            name="message"
            label="Message"
            type="text"
            value={formValues.message}
            onChange={handleChange}
            
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
