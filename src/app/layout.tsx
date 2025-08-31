import {Noto_Sans_Display} from 'next/font/google'
import "./globals.css";

const notoSansDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-display',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansDisplay.className}
      >
        {children}
      </body>
    </html>
  );
}
