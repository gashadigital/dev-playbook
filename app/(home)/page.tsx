import { Card, Cards } from 'fumadocs-ui/components/card';
import { GitBranch, Server, Smartphone, Globe, Lock, Rocket } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center flex-1 w-full max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">
        Gasha Digital Dev Playbook
      </h1>
      <p className="text-muted-foreground mb-2 max-w-2xl">
        The engineering blueprint for modern development. A curated knowledge base of manual stack configurations, DevOps workflows, and cross-platform strategies engineered to eliminate configuration drift, standardize local environments, and accelerate project onboarding.
      </p>
      <Cards className="w-full">
        <Card
          icon={<GitBranch className="size-4" />}
          title="Version Control"
          href="/docs/version-control/git-basics"
          description="Essential Git concepts, daily workflow, and branching"
        />
        <Card
          icon={<Server className="size-4" />}
          title="Local Server"
          href="/docs/local-server/wamp-setup"
          description="WAMP stack setup (Apache, PHP, MySQL)"
        />
        <Card
          icon={<Smartphone className="size-4" />}
          title="Mobile Development"
          href="/docs/mobile-dev/install-flutter"
          description="Flutter, splash screens, and assets"
        />
        <Card
          icon={<Globe className="size-4" />}
          title="Web Development"
          href="/docs/web-dev/next-setup"
          description="Next.js, Laravel, and mail setup"
        />
        <Card
          icon={<Lock className="size-4" />}
          title="Identity & Authentication Providers"
          href="/docs/identity-auth"
          description="Google OAuth 2.0 & credential matrix setup"
        />
        <Card
          icon={<Rocket className="size-4" />}
          title="Deployment"
          href="/docs/deployment/cherry-picking"
          description="Cherry-picking workflows and deployment guides"
        />
      </Cards>
    </div>
  );
}
