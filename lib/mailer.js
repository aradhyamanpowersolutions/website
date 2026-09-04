import nodemailer from 'nodemailer';

import { site } from './site';

/**
 * Replaces the standalone Express server that used to live in ./server.
 * Configure via env: EMAIL_USER / EMAIL_PASS (a Gmail app password), and
 * optionally EMAIL_TO to route submissions somewhere other than the default.
 */
let cachedTransporter = null;

export function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set to send mail.');
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
  }

  return cachedTransporter;
}

// Form submissions go to the published contact addresses by default.
// Override with EMAIL_TO (comma-separated) to route them elsewhere.
export const inboxAddress = () => process.env.EMAIL_TO || site.emails.join(', ');

/** Strips CR/LF so user input cannot inject extra mail headers. */
export const headerSafe = (value = '') => String(value).replace(/[\r\n]+/g, ' ').trim();

export const isEmail = (value = '') => /^\S+@\S+\.\S+$/.test(String(value).trim());
