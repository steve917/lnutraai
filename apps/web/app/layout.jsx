import "../styles/globals.css";

export const metadata = {
  title: process.env.NEXT_PUBLIC_COMPANY_NAME || "L-Nutra AI",
  description: process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Backed by Science. Powered by AI.",
  robots: { index: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
