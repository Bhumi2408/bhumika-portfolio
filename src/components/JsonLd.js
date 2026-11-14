/** Renders one or more JSON-LD structured-data blocks for search engines. */
export default function JsonLd({ data }) {
  const list = Array.isArray(data) ? data : [data];
  return list.map((d, i) => (
    <script
      key={i}
      type="application/ld+json"
      // escape "<" so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
    />
  ));
}
