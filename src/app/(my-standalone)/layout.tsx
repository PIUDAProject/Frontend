export default function MyStandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-surface-2 mx-auto flex min-h-svh max-w-[390px] flex-col">{children}</main>
  );
}
