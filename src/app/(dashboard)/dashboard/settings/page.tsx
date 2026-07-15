import { PageHeader } from "@/components/common/page-header";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your blog CMS preferences"
      />
      <div className="rounded-xl border border-dashed bg-muted/20 p-12 text-center">
        <p className="text-muted-foreground">Settings — coming soon</p>
      </div>
    </div>
  );
}
