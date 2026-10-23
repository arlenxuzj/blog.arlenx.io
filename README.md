# blog.arlenx.io

My personal blog.

## Development

Requires Node.js **24.22.1** and npm **11.19.1**.

```sh
npm ci
npm run db:generate
npm run dev
```

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` to validate changes. Run `npm run content` first when type-checking a fresh checkout. See [runtime, security, environment and deployment notes](docs/security-upgrade.md), including the documented local mitigation for an unresolved upstream development-dependency advisory.

## 🎨 About This Site

This site is hosted on [Vercel](https://vercel.com), built with [Next.js](https://nextjs.org), [React](https://reactjs.org), [Mui](https://mui.com), [MDX](https://mdxjs.com), and [TypeScript](https://www.typescriptlang.org).

## ✨ Tech Stack

- [Mui CSS theme variables](https://mui.com/material-ui/experimental-api/css-theme-variables/overview)
- Compile repository MDX content with [MDX](https://mdxjs.com) and remark/rehype plugins
- View count by [Prisma](https://www.prisma.io) and [MongoDB](https://www.mongodb.com)
- Comments by [Giscus](https://giscus.app)
- Coding stats by [Wakatime](https://wakatime.com) API
- Site analytics by [Vercel Analytics](https://vercel.com/analytics), [Google Analytics](https://analytics.google.com), and [Umami](https://umami.is)
- SEO by [Next SEO](https://github.com/garmeeh/next-seo)
- Open graph image generator API by [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) library

## 🧭 References

The design of this site is inspired by or directly from the following sites:

- [Maxime Heckel's Blog](https://blog.maximeheckel.com)
- [Leo's blog - Leo's coding journey](https://www.leohuynh.dev)
- [xiaojun's blog](https://www.xiaojun.im)
- [Daw-Chih Liou - Software engineer, UX designer, writer](https://dawchihliou.github.io)
- [Lee Robinson – Developer, writer, creator.](https://leerob.io)

Thanks for the inspiration 🙏

## 📎 Assets

Most of the icons in my blog are from [Devicon](https://devicon.dev) and [Lucide](https://lucide.dev), emoji are from [Twemoji](https://twemoji.twitter.com), and illustrations are from [Undraw](https://undraw.co/illustrations) and [Storyset](https://storyset.com).

Thanks for the free resources 🙏

---

Copyright © 2023 • Zhen Jun Xu (Arlen) • All rights reserved.
