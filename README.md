# Gasha Digital Dev Playbook

A curated documentation site for technical workflows, manual setup guides, and best practices for Full-Stack and Mobile development. This playbook standardizes development environments and streamlines onboarding for new projects at Gasha Digital Technology.

## Why This Playbook?

We created this playbook to:

- **Centralize knowledge** — Keep setup guides, workflows, and conventions in one searchable place
- **Standardize environments** — Ensure consistent tooling (Git, WAMP, Flutter, Next.js, Laravel) across the team
- **Speed up onboarding** — Give new developers a clear path from zero to productive
- **Reduce tribal knowledge** — Document what used to live only in people’s heads

## What’s Inside?

| Chapter              | Content                                                |
| -------------------- | ------------------------------------------------------ |
| **Version Control**  | Git basics, daily workflow, branching                  |
| **Local Server**     | WAMP stack setup (Apache, PHP, MySQL)                  |
| **Mobile Development** | Flutter setup, splash screens, environment & assets |
| **Web Development**  | Next.js, Laravel essentials, mail sandbox setup        |

---

## Get Started

### Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Recommended reading order

1. Start with **Version Control (Git)** so all environment setup is versioned
2. Then **Local Server** for the WAMP stack
3. Then **Mobile** or **Web** depending on your focus

---

## Tech Stack

This site is built with:

| Technology      | Purpose                                      |
| --------------- | -------------------------------------------- |
| **[Next.js 16](https://nextjs.org)** | React framework, App Router, static generation |
| **[Fumadocs](https://fumadocs.dev)** | Docs framework and UI components            |
| **[Fumadocs MDX](https://fumadocs.dev/docs/mdx)** | MDX content, collections, search          |
| **[Tailwind CSS](https://tailwindcss.com)** | Styling                                  |
| **[Lucide Icons](https://lucide.dev)** | Icons for sidebar and cards               |

### Project structure

| Path                    | Description                              |
| ----------------------- | ---------------------------------------- |
| `app/(home)`            | Landing page with chapter cards          |
| `app/docs`              | Documentation layout (Notebook style)     |
| `content/docs`          | MDX documentation content                |
| `lib/source.ts`         | Content source adapter (`loader()` API)  |
| `lib/layout.shared.tsx` | Shared nav, theme, GitHub config         |
| `app/api/search/route.ts` | Search API endpoint                    |

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev) — docs framework
- [Fumadocs MDX](https://fumadocs.dev/docs/mdx) — content collections & frontmatter
