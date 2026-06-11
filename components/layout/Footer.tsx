import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-zinc-500">
          © {year} {siteConfig.name}. Built with Next.js & Framer Motion.
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cyan"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cyan"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className="transition-colors hover:text-cyan"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
