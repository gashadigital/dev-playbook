import { Card, Cards } from 'fumadocs-ui/components/card';
import { GitBranch, Server, Smartphone, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center flex-1 w-full max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">
        Gasha Digital Dev Playbook
      </h1>
      <p className="text-muted-foreground mb-2 max-w-2xl">
        A curated collection of technical workflows, manual setup guides, and best
        practices for Full-Stack and Mobile development.
      </p>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        This playbook is designed to standardize development environments and streamline the onboarding process for new projects.
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
      </Cards>
    </div>
  );
}
