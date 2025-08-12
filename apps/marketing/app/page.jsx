export default function Page() {
  return (
    <main>
      <h1>{process.env.NEXT_PUBLIC_COMPANY_NAME}</h1>
      <p>{process.env.NEXT_PUBLIC_BRAND_TAGLINE}</p>
      <p>Contact: <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a></p>
    </main>
  );
}
