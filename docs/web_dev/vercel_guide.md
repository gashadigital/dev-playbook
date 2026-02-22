# Deploying a Documentation Site to Vercel

This guide walks you through deploying a documentation site to Vercel. We assume your documentation is written in Markdown and you want to use a framework like Next.js (which supports TypeScript) to serve it. This process is common for developers and is a great way to publish your work.

---

## 1. Set Up Your Project

First, create a project that will host your documentation. While the content is in Markdown, the site itself will be built with a web framework.

### Option A: Using a Static Site Generator (Recommended for Documentation)

Static site generators like Next.js, Gatsby, or Astro work well for documentation. They compile your Markdown files into static HTML pages, which are fast and secure.

For Next.js with TypeScript, run:

```bash
npx create-next-app@latest --typescript
```

This command sets up a new project with the necessary files and configurations. You can then place your documentation files in a `pages` or `app` directory and have them render as part of your site.

---

## 2. Initialize a Git Repository

Vercel's deployment process is tightly integrated with Git. Create a Git repository and push it to a remote hosting service like GitHub, GitLab, or Bitbucket.

**Initialize Git:** Open your terminal in the project directory and run:

```bash
git init
```

**Add and commit files:**

```bash
git add .
git commit -m "Initial commit for documentation site"
```

**Create a remote repository:** Go to your preferred Git hosting service (e.g., [GitHub](https://github.com)), create a new empty repository, and follow the instructions to link your local project to it:

```bash
git remote add origin <your_repository_url>
git branch -M main
git push -u origin main
```

---

## 3. Create a Vercel Account and Connect Git

Connect your Git repository to Vercel.

1. **Sign up for Vercel:** Go to [vercel.com](https://vercel.com) and sign up using your Git account (e.g., "Continue with GitHub"). This is the easiest way to connect your repositories.

2. **Import Your Git Repository:**
   - Once logged in, click **Add New…** and then **Project**.
   - Vercel will ask you to connect your Git provider. If you signed in with GitHub, it will already be connected.
   - Click **Import Git Repository** and select the repository you created.

3. **Configure the Project:** Vercel will automatically detect that you're using a framework like Next.js. You can leave most of the default settings as they are.

4. **Deploy:** Click the **Deploy** button. Vercel will clone your repository, install dependencies, build your project, and deploy it to a live URL. This process takes a few minutes.

---

## 4. Subsequent Deployments

The best part of Vercel is automatic deployment. Every time you push new changes to your `main` branch (or another branch you've configured), Vercel will automatically build and deploy the new version. From your local project folder, run:

```bash
git add .
git commit -m "Updated documentation"
git push
```

Your changes will be live on Vercel's servers in a few moments.
