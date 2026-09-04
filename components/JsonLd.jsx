/**
 * Renders a schema.org document as a `<script type="application/ld+json">`.
 * Server component — the JSON ships inside the initial HTML, which is what
 * crawlers read.
 */
export default function JsonLd({ id, data }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // JSON.stringify output is not HTML; escape the one sequence that could
      // otherwise close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
