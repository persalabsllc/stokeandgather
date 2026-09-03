import './globals.css';

export const metadata = {
  title: 'Stoke & Gather | Fire Pit Weather Starts Here',
  description: 'Fire pits, outdoor cooking gear, furniture, heaters and everything you need for unforgettable nights outside.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
