import type { ReactNode } from "react";
import { isPlaceholder } from "@/content/placeholder";
import { profile, whatsappUrl } from "@/content/profile";
import { ChatIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

type Item = { key: string; icon: ReactNode; label: string; href: string | null; external?: boolean };

function items(): Item[] {
  return [
    {
      key: "email",
      icon: <MailIcon />,
      label: profile.email,
      href: isPlaceholder(profile.email) ? null : `mailto:${profile.email}`,
    },
    { key: "linkedin", icon: <LinkedInIcon />, label: "LinkedIn", href: profile.linkedin, external: true },
    { key: "github", icon: <GitHubIcon />, label: "GitHub", href: profile.github, external: true },
    {
      key: "whatsapp",
      icon: <ChatIcon />,
      label: profile.phone,
      href: whatsappUrl(profile.phone),
      external: true,
    },
  ];
}

export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${className}`}>
      {items().map((item) => (
        <li key={item.key}>
          {item.href ? (
            <a
              href={item.href}
              className="link inline-flex min-h-11 items-center gap-2"
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.icon}
              {item.label}
              {item.key === "whatsapp" && <span className="sr-only"> (WhatsApp)</span>}
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 opacity-70">
              {item.icon}
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
