import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const msg = {
      to: `andrewgeorgemitchell@gmail.com`, // Change to your recipient
      from: `andrewgeorgemitchell@gmail.com`, // Change to your verified sender
      subject: `${request.body.name} has filled out oztoca form`,
      text: `${request.body.name} has filled out oztoca form. Here's their info:
          Name: ${request.body.name}
          Email: ${request.body.email}
          Message: ${request.body.message}
          `,
      html: `<strong>
          <h1>${request.body.name} has filled out oztoca form</h1>
          <p>Here's their info:</p>
          <ul>
              <li>Name: ${request.body.name}</li>
              <li>Email: ${request.body.email}</li>
              <li>Phone: ${request.body.phone}</li>
              <li>Message: ${request.body.message}</li>
          </ul>
          </strong>`,
    };
    const res = await sgMail.send(msg);
    response.status(200).json({ message: `ok` });
  } catch (error) {
    response.status(500).json({ error });
  }
}