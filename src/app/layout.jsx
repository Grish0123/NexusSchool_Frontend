import '../styles/globals.scss';

export const metadata = {
  metadataBase: new URL('https://nexus.edu.np'),
  applicationName: 'Nexus International School',
  icons: {
    icon: [
      {
        url: '/favicon_io/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon_io/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
  manifest: '/favicon_io/site.webmanifest',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const schoolSchema = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: 'Nexus International School',
    alternateName: 'Nexus',
    url: 'https://nexus.edu.np/',
    logo: 'https://nexus.edu.np/site-images/Logo%20Nexus.png',
    description: 'Nexus International School is a future-ready school in Kathmandu, Nepal.',
    email: 'info@nexus.edu.np',
    telephone: ['+977-1-4990303', '+977-1-4991051'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pepsi-Cola Town Planning',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schoolSchema),
          }}
        />
      </body>
    </html>
  );
}
