import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Social Booster Media Demo",
  description: "Vercel-ready starter for Social Booster Media demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
