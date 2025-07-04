'use client'
import { useEffect, useRef, useState } from "react";

// Social media icons (simple SVGs for demo)
const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/explore/search/keyword/?q=%23nitjsr",
    icon: (
      <svg width="24" height="24" fill="none" stroke="#E1306C" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" stroke="#E1306C" />
        <circle cx="18" cy="6" r="1" fill="#E1306C" stroke="#E1306C" />
      </svg>
    ),
  },
  // {
  //   name: "Instagram (Urja)",
  //   url: "https://www.instagram.com/urja_nitjsr?igsh=MXpid2xjcmx4aWhz",
  //   icon: (
  //     <svg width="24" height="24" fill="none" stroke="#E1306C" strokeWidth="2">
  //       <rect x="2" y="2" width="20" height="20" rx="5" />
  //       <circle cx="12" cy="12" r="5" stroke="#E1306C" />
  //       <circle cx="18" cy="6" r="1" fill="#E1306C" stroke="#E1306C" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "Instagram (Culfest)",
  //   url: "https://www.instagram.com/culfest.nitjsr?igsh=cnJyeW0xeTk0djA2",
  //   icon: (
  //     <svg width="24" height="24" fill="none" stroke="#E1306C" strokeWidth="2">
  //       <rect x="2" y="2" width="20" height="20" rx="5" />
  //       <circle cx="12" cy="12" r="5" stroke="#E1306C" />
  //       <circle cx="18" cy="6" r="1" fill="#E1306C" stroke="#E1306C" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "Instagram (Ojass)",
  //   url: "https://www.instagram.com/ojass.nitjsr?igsh=YTdic2Q4ZGc4amkz",
  //   icon: (
  //     <svg width="24" height="24" fill="none" stroke="#E1306C" strokeWidth="2">
  //       <rect x="2" y="2" width="20" height="20" rx="5" />
  //       <circle cx="12" cy="12" r="5" stroke="#E1306C" />
  //       <circle cx="18" cy="6" r="1" fill="#E1306C" stroke="#E1306C" />
  //     </svg>
  //   ),
  // },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@sacnitjsr",
    icon: (
      <svg width="24" height="24" fill="none" stroke="#FF0000" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <polygon points="10,9 16,12 10,15" fill="#FF0000" />
      </svg>
    ),
  },
  {
    name: "Website",
    url: "https://nitjsr.ac.in/",
    icon: (
      <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2">
        <circle cx="12" cy="12" r="10" stroke="#2563eb" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#2563eb" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="#2563eb" />
        <line x1="12" y1="2" x2="12" y2="22" stroke="#2563eb" />
      </svg>
    ),
  },
  // Add more as needed
];

export default function SocialMediaSidebar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`social-sidebar`}
      data-visible={visible}
      style={{
        position: "fixed",
        top: "40%",
        left: 0,
        zIndex: 1000,
        transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
        background: "rgba(255,255,255,0.9)",
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "0.5rem 0.5rem 0.5rem 0.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "auto",
      }}
      aria-label="Social Media Links"
    >
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          style={{
            color: "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#f3f3f3",
            transition: "background 0.2s",
            textDecoration: "none",
            fontSize: "1rem",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#e0e0e0")}
          onMouseOut={e => (e.currentTarget.style.background = "#f3f3f3")}
        >
          {link.icon}
        </a>
      ))}
      {/* Responsive CSS for SSR/CSR consistency */}
      <style>{`
        .social-sidebar {
          transform: translateX(0);
        }
        .social-sidebar[data-visible="false"] {
          transform: translateX(-100%);
        }
        @media (max-width: 640px) {
          .social-sidebar {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            flex-direction: row !important;
            border-radius: 1rem 1rem 0 0 !important;
            width: 100vw !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0.25rem 0.5rem 0.5rem 0.5rem !important;
            transform: translateY(0) !important;
            transition: transform 0.4s cubic-bezier(.4,0,.2,1);
          }
          .social-sidebar[data-visible="false"] {
            transform: translateY(100%) !important;
          }
          .social-sidebar a {
            width: 48px !important;
            height: 48px !important;
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}