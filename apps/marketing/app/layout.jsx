export const metadata = {
  title: process.env.NEXT_PUBLIC_COMPANY_NAME || "L-Nutra AI",
  description: process.env.NEXT_PUBLIC_BRAND_TAGLINE || "",
  robots: { index: false, follow: false }
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="robots" content="noindex,nofollow" /></head>
      <body style={{margin:0, padding:24, fontFamily:"Inter, system-ui"}}>
        {children}
      </body>
    </html>
  );
}
