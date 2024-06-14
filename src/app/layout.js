import './globals.css'

export const metadata = {
  title: "AQI Predictor",
  description: "Know about the forecast of air quality index(AQI) in India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
