'use client';

import { useEffect, useRef } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

/**
 * Accessible submit-status dialog shared by the contact and apply forms.
 * The entry animation is a CSS keyframe (see globals.css) rather than an
 * animation library, and the old approach of pinning `document.body` to a
 * scroll offset — which jumped the page on close — is gone.
 */
export default function StatusDialog({ open, isSubmitting, status, onClose, messages }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, isSubmitting, onClose]);

  useEffect(() => {
    if (open && !isSubmitting) closeButtonRef.current?.focus();
  }, [open, isSubmitting]);

  if (!open) return null;

  let message = '';
  let icon = null;

  if (isSubmitting) {
    message = messages.pending;
    icon = (
      <svg className="h-10 w-10 animate-spin text-hivis-ink" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  } else if (status === 'success') {
    message = messages.success;
    icon = <CheckCircleIcon className="h-12 w-12 text-[rgb(22_140_90)]" aria-hidden="true" />;
  } else if (status === 'error') {
    message = messages.error;
    icon = <ExclamationCircleIcon className="h-12 w-12 text-[rgb(200_45_30)]" aria-hidden="true" />;
  }

  return (
    <div
      className="dialog-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[rgb(14_17_22)]/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-live="assertive"
      onClick={isSubmitting ? undefined : onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="dialog-panel w-full max-w-sm rounded border border-line bg-surface p-8 text-center"
      >
        <div className="mb-6 flex justify-center">{icon}</div>
        <p className="mb-6 text-xl font-medium">{message}</p>
        {!isSubmitting ? (
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="btn-primary"
          >
            Close
          </button>
        ) : null}
      </div>
    </div>
  );
}
