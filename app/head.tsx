// app/head.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Hub",
  description: "Generated by Game Hub",
};

export default function Head() {
  return (
    <>
      <title>{String(metadata.title ?? 'Default Title')}</title>
      <meta name="description" content={String(metadata.description ?? 'Default Description')} />
    </>
  );
}