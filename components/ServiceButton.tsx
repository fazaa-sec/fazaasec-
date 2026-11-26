'use client';

// Scrolls to the contact form and pre-selects the service in it.
export default function ServiceButton({ service, label }: { service: string; label: string }) {
  return (
    <a
      href="#contact"
      className="btn-ghost mt-8 w-full"
      onClick={() => window.dispatchEvent(new CustomEvent('select-service', { detail: service }))}
    >
      {label}
    </a>
  );
}
