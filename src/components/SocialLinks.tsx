
import React from "react";
import { Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  className?: string;
}

type SocialLinkItem = {
  name: string;
  url: string;
  icon: LucideIcon | React.FC;
};

const SocialLinks: React.FC<SocialLinkProps> = ({ className }) => {
  const socialLinks: SocialLinkItem[] = [
    {
      name: "Instagram",
      url: "https://instagram.com/yeon.live",
      icon: Instagram,
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@yeon.live",
      // Creating a custom TikTok icon since it's not available in lucide-react
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yeon.live",
      icon: Twitter,
    },
  ];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yeon-orange transition-colors"
            aria-label={link.name}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
