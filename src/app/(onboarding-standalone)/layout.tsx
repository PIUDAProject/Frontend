export default function OnboardingStandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-surface-2 mx-auto flex min-h-svh w-full max-w-[390px] flex-col">
      {children}
    </main>
  );
}
