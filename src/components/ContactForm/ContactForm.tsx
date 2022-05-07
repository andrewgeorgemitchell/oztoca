import { Button, Grid, makeStyles } from '@material-ui/core';
import { Alert, Snackbar, TextField, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
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
    message: '',
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('success');
  const sendEmail = () => {
    setLoading(true);
    axios
      .post('/api/contact-form', {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        message: formValues.message,
      })
      .then((res) => {
        setLoading(false);
        setFormValues(defaultValues);
        setStatus('success');
        setOpen(true);
      })
      .catch((err) => {
        setStatus('error');
        setOpen(true);
        setLoading(false);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: send form data to backend
    // TODO: show success message
    // TODO: handle error message
    sendEmail();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        {status === 'success' ? (
        <Alert severity="success">
          Your message has been sent successfully.
        </Alert>
        ) : (
        <Alert severity="error">
          There was an error sending your message. Please try again.
        </Alert>  )
        }
      </Snackbar>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="phone-input"
            name="phone"
            label="phone"
            type="number"
            value={formValues.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleChange}
            required
            fullWidth
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="message-input"
            name="message"
            label="Message"
            type="text"
            multiline
            rows={4}
            value={formValues.message}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <LoadingButton
            variant="contained"
            color="secondary"
            type='submit'
            disabled={loading}
            loading={loading}
            startIcon={<SendIcon />}
            loadingPosition="start"
          >
            Send Message
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
