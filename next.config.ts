import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* MDX dikompilasi saat runtime di Server Component (lihat src/lib/mdx.ts),
     bukan via @next/mdx webpack-loader. */
};

export default nextConfig;
