import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Vollkorn } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Andre Koga",
  description: "Andre Koga's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-sidebar">
      <body
        className={`${vollkorn.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar className="border-none p-2 pr-1" />
            <main className="px-4 py-2 rounded-lg bg-background m-2 w-full">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
