import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Grid } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ContactForm = ({ src }: { src: string }) => {
  const defaultValues = {
    name: ``,
    email: ``,
    phone: ``,
    message: ``,
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(`success`);
  const [token, setToken] = useState(``);
  const captchaRef = useRef<any>(null);

  useEffect(() => {
    if (token) {
      // Token is set, can submit here
      console.log(`hCaptcha Token: ${token}`);
    }
  }, [token]);

  const onExpire = () => {
    console.log(`hCaptcha Token Expired`);
  };

  const onError = (err: any) => {
    console.log(`hCaptcha Error: ${err}`);
  };

  const sendEmail = () => {
    setLoading(true);
    axios
      .post(`/api/contact-form`, {
        src,
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        message: formValues.message,
      })
      .then(() => {
        setLoading(false);
        setFormValues(defaultValues);
        setStatus(`success`);
        setOpen(true);
      })
      .catch(() => {
        setStatus(`error`);
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
    captchaRef.current.execute();
    sendEmail();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: `top`, horizontal: `center` }}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        {status === `success` ? (
          <Alert severity="success">
            Your message has been sent successfully.
          </Alert>
        ) : (
          <Alert severity="error">
            There was an error sending your message. Please try again.
          </Alert>
        )}
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
            label="Phone"
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
        <Grid item xs={12} style={{ textAlign: `center` }}>
          <HCaptcha
            sitekey="70a1e18f-36d8-4612-8f4c-f4427e3858aa"
            onVerify={setToken}
            onError={onError}
            onExpire={onExpire}
            size="normal"
            ref={captchaRef}
            theme="dark"
          />
          <LoadingButton
            variant="contained"
            color="secondary"
            type="submit"
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
