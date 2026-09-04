'use client';

import { useState } from 'react';
import StatusDialog from '@/components/StatusDialog';
import { interestOptions } from '@/lib/services';

const EMPTY = { name: '', email: '', phone: '', interest: '', message: '', website: '' };
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const fieldClass = (hasError) => `field ${hasError ? 'field-error' : ''}`;

export default function ApplyForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = 'Email is invalid';
    if (!formData.phone.trim()) next.phone = 'Phone number is required';
    if (!formData.interest.trim()) next.interest = 'Area of interest is required';

    if (!resume) next.resume = 'Résumé is required';
    else if (!resume.name.toLowerCase().endsWith('.pdf')) next.resume = 'Résumé must be a PDF file';
    else if (resume.size > MAX_RESUME_BYTES) next.resume = 'Résumé must be under 5 MB';

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setStatus(null);
    setShowDialog(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    payload.append('resume', resume);

    try {
      const response = await fetch('/api/apply', { method: 'POST', body: payload });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      setStatus('success');
      setFormData(EMPTY);
      setResume(null);
      event.target.reset();
    } catch (error) {
      console.error('Application submission failed:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded border border-line bg-surface p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="apply-website">Website</label>
            <input
              id="apply-website"
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
              <label htmlFor="apply-name" className="field-label">
                Full Name <span className="text-hivis-ink">*</span>
              </label>
              <input
                type="text"
                id="apply-name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'apply-name-error' : undefined}
                className={fieldClass(errors.name)}
              />
              {errors.name ? (
                <p id="apply-name-error" className="mt-2 font-mono text-sm text-[rgb(200_45_30)]">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="apply-email" className="field-label">
                Email Address <span className="text-hivis-ink">*</span>
              </label>
              <input
                type="email"
                id="apply-email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'apply-email-error' : undefined}
                className={fieldClass(errors.email)}
              />
              {errors.email ? (
                <p id="apply-email-error" className="mt-2 font-mono text-sm text-[rgb(200_45_30)]">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="apply-phone" className="field-label">
                Phone Number <span className="text-hivis-ink">*</span>
              </label>
              <input
                type="tel"
                id="apply-phone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'apply-phone-error' : undefined}
                className={fieldClass(errors.phone)}
              />
              {errors.phone ? (
                <p id="apply-phone-error" className="mt-2 font-mono text-sm text-[rgb(200_45_30)]">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="apply-interest" className="field-label">
                Area of Interest <span className="text-hivis-ink">*</span>
              </label>
              <select
                id="apply-interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                aria-invalid={Boolean(errors.interest)}
                aria-describedby={errors.interest ? 'apply-interest-error' : undefined}
                className={fieldClass(errors.interest)}
              >
                <option value="">Select an area</option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.interest ? (
                <p id="apply-interest-error" className="mt-2 font-mono text-sm text-[rgb(200_45_30)]">
                  {errors.interest}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="apply-message" className="field-label">
              Why do you want to join our team? (Optional)
            </label>
            <textarea
              id="apply-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={fieldClass(false)}
            />
          </div>

          <div>
            <label htmlFor="apply-resume" className="field-label">
              Upload Your Résumé (PDF, max 5 MB) <span className="text-hivis-ink">*</span>
            </label>
            <input
              type="file"
              id="apply-resume"
              name="resume"
              accept="application/pdf,.pdf"
              onChange={(event) => setResume(event.target.files?.[0] ?? null)}
              aria-invalid={Boolean(errors.resume)}
              aria-describedby={errors.resume ? 'apply-resume-error' : undefined}
              className={`${fieldClass(errors.resume)} file:mr-4 file:rounded file:border-0 file:bg-ink file:px-4 file:py-2 file:font-mono file:text-sm file:font-medium file:uppercase file:tracking-wider file:text-ground`}
            />
            {errors.resume ? (
              <p id="apply-resume-error" className="mt-2 font-mono text-sm text-[rgb(200_45_30)]">
                {errors.resume}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>

      <StatusDialog
        open={showDialog}
        isSubmitting={isSubmitting}
        status={status}
        onClose={() => {
          setShowDialog(false);
          setStatus(null);
        }}
        messages={{
          pending: 'Submitting your application…',
          success: "Thank you for your application! We'll review it and get back to you soon.",
          error: 'An error occurred while submitting your application. Please try again.',
        }}
      />
    </>
  );
}
