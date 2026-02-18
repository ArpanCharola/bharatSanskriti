import React from 'react';
import ArpanPhoto from '../assets/Arpan.png';
import KrishPhoto from '../assets/Krish.png';
import './About.css';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
  </svg>
);

const TEAM_MEMBERS = [
  {
    id: 'arpan',
    name: 'Arpan Charola',
    displayName: 'Arpan',
    role: 'Fullstack Developer',
    photo: ArpanPhoto,
    imageClass: 'team-image--arpan',
    socials: [
      {
        type: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/arpancharola/',
      },
      {
        type: 'github',
        label: 'GitHub',
        href: 'https://github.com/ArpanCharola',
      },
      {
        type: 'email',
        label: 'Email',
        href: 'mailto:arpantech1130@gmail.com',
      },
    ],
  },
  {
    id: 'krish',
    name: 'Krish Vyas',
    displayName: 'Krish Vyas',
    role: 'Strategist & Cultural Curator',
    photo: KrishPhoto,
    imageClass: 'team-image--krish',
    socials: [
      {
        type: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/krish-vyas-61a1b6251/',
      },
      {
        type: 'github',
        label: 'GitHub',
        href: 'https://github.com/Krishvyas99',
      },
      {
        type: 'email',
        label: 'Email',
        href: 'mailto:krissvyas999@gmail.com',
      },
    ],
  },
];

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  github: GithubIcon,
  email: MailIcon,
};

const About = () => {
  return (
    <div className="about-page">
      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <p className="mission-kicker">Bharat Sanskriti</p>
          <h1 className="mission-title">Our Mission</h1>
          <p className="mission-description">
            We're dedicated to preserving and celebrating India's rich cultural heritage through modern
            technology. Bharat Sanskriti connects tradition with innovation, making our ancient wisdom
            accessible to today's generation.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="team-title">Meet Our Team</h2>

          <div className="team-grid">
            {TEAM_MEMBERS.map((member, index) => {
              const cardDelay = `${0.2 + index * 0.12}s`;
              return (
                <article className="team-card" key={member.id} style={{ '--card-delay': cardDelay }}>
                  <div className="team-image-wrapper">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className={`team-image ${member.imageClass}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">{member.displayName}</h3>
                    <p className="team-role">{member.role}</p>
                    <div className="team-social">
                      {member.socials.map((social) => {
                        const Icon = SOCIAL_ICONS[social.type];
                        return (
                          <a
                            key={`${member.id}-${social.type}`}
                            href={social.href}
                            target={social.href.startsWith('http') ? '_blank' : undefined}
                            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="social-link"
                            aria-label={`${social.label} (${member.displayName})`}
                          >
                            <Icon />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
