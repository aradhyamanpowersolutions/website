'use client';

import { useState } from 'react';
import StatusDialog from '@/components/StatusDialog';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { whatsappLink, staffEnquiryMessage } from '@/lib/whatsapp';

const EMPTY = { name: '', email: '', phone: '', company: '', message: '', website: '' };

const inputClass = 'field';

export default function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setShowDialog(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setStatus('success');
      setFormData(EMPTY);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded border border-line bg-surface p-6 md:p-8"
      >
        {/* Honeypot: real people never see or fill this. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">
              Name <span className="text-hivis-ink">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="field-label">
              Email <span className="text-hivis-ink">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="field-label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label htmlFor="company" className="field-label">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your Company Ltd."
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="message" className="field-label">
            Message <span className="text-hivis-ink">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Tell us about your manpower needs — roles, headcount, shift pattern and site."
          />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>

          {/* Opens WhatsApp with everything typed so far already in the message.
              Not a submit button — it deliberately leaves the form intact so the
              visitor can still send by email if they change their mind. */}
          <a
            href={whatsappLink(staffEnquiryMessage(formData))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Send on WhatsApp
          </a>
        </div>

        <p className="mt-4 text-center text-base text-muted">
          WhatsApp opens with your details filled in — you just press send.
        </p>
      </form>

      <StatusDialog
        open={showDialog}
        isSubmitting={isSubmitting}
        status={status}
        onClose={() => {
          setShowDialog(false);
          setStatus(null);
        }}
        messages={{
          pending: 'Sending your message…',
          success: "Thank you! We'll reach back to you soon.",
          error: 'Something went wrong. Please try again, or email us directly.',
        }}
      />
    </>
  );
}
