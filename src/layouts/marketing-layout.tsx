import { marketingConfig } from "@/config/marketing";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="mb-4 flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <div className="flex gap-6">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
