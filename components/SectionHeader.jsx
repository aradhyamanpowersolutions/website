/**
 * Every section opens the same way: a mono signage label, a tight display
 * heading, and an optional lede. Left-aligned — the old build centred every
 * heading, which flattened the page into one undifferentiated column.
 */
export default function SectionHeader({ eyebrow, title, lede, id, align = 'left', children }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : ''}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 id={id} className="text-title font-bold">
        {title}
      </h2>
      {lede ? <p className={`lede mt-5 ${align === 'center' ? 'mx-auto' : ''}`}>{lede}</p> : null}
      {children}
    </div>
  );
}
