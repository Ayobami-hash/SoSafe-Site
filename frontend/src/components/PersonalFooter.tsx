import React, { useState, useCallback } from 'react';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, Home, Newspaper, Building2, Users, Contact, LayoutGrid, UserCircle} from 'lucide-react';
import PolicyModals from './PolicyModals';


// Define notification types
// type NotificationType = 'announcement' | 'news' | 'missing_person' | 'wanted_person' | 'social_update';

interface NotificationPreferences {
  announcements: boolean;
  news: boolean;
  missing_persons: boolean;
  wanted_persons: boolean;
  social_updates: boolean;
}

interface SubscriptionFormData {
  email: string;
  preferences: NotificationPreferences;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface QuickLink {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface ContactInfo {
  type: 'phone' | 'email' | 'address';
  value: string;
  icon: React.ReactNode;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  quickLinks?: QuickLink[];
  contactInfo?: ContactInfo[];
  showNewsletter?: boolean;
  onSocialClick?: (platform: string, url: string) => void;
  onQuickLinkClick?: (title: string, url: string) => void;
}

const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'Facebook',
    url: 'https://facebook.com/yourpage',
    icon: <Facebook size={20} />
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/youraccount',
    icon: <Twitter size={20} />
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/youraccount',
    icon: <Instagram size={20} />
  }
];


const defaultQuickLinks: QuickLink[] = [
  {
    title: 'Home',
    url: '/',
    icon: <Home size={16}  />
  },
  {
    title: 'News and Updates',
    url: '/news',
    icon: <Newspaper size={16}  />
  },
  {
    title: 'Agency',
    url: '/about/agency',
    icon: <Building2 size={16}  />
  },
  {
    title: 'Management Team',
    url: '/about/management',
    icon: <Users size={16}  />
  },
  {
    title: 'Contact',
    url: '/about/contact',
    icon: <Contact size={16}  />
  },
  {
    title: 'Department',
    url: '/departments',
    icon: <LayoutGrid size={16}  />
  },
  {
    title: 'Personnel',
    url: '/personnel',
    icon: <UserCircle size={16}  />
  }
];

const defaultContactInfo: ContactInfo[] = [
  {
    type: 'phone',
    value: '767 (Toll Free)',
    icon: <Phone size={16} />
  },
  {
    type: 'phone',
    value: '+234 123 456 7890',
    icon: <Phone size={16} />
  },
  {
    type: 'email',
    value: 'info@sosafecorps.og.gov.ng',
    icon: <Mail size={16} />
  },
  {
    type: 'address',
    value: 'Headquarters, Abeokuta, Ogun State',
    icon: <MapPin size={16} />
  }
];

const Footer: React.FC<FooterProps> = ({
  socialLinks = defaultSocialLinks,
  quickLinks = defaultQuickLinks,
  contactInfo = defaultContactInfo,
  showNewsletter = true,
  onSocialClick,
  onQuickLinkClick,
}) => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    email: '',
    preferences: {
      announcements: true,
      news: true,
      missing_persons: true,
      wanted_persons: true,
      social_updates: true
    }
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleSocialClick = useCallback((platform: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onSocialClick) {
      onSocialClick(platform, url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [onSocialClick]);

  const handleQuickLinkClick = useCallback((title: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onQuickLinkClick) {
      onQuickLinkClick(title, url);
    } else {
      window.location.href = url;
    }
  }, [onQuickLinkClick]);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus({
        type: 'success',
        message: 'Successfully subscribed to the newsletter!'
      });
      setFormData({ ...formData, email: '' });
      setShowPreferences(false);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again later.'
      });
    }
  };

  const togglePreference = (key: keyof NotificationPreferences) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }));
  };

  return (
    <footer className="bg-[#006838] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">About So-Safe Corps</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Ogun State Community, Social and Security Corps (So-Safe Corps) is dedicated to ensuring the safety and security of all residents through professional service and community partnership.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  onClick={(e) => handleSocialClick(link.platform, link.url, e)}
                  className="hover:text-[#FFD700] transition-colors"
                  aria-label={`Follow us on ${link.platform}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    onClick={(e) => handleQuickLinkClick(link.title, link.url, e)}
                    className="text-gray-200 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                  >
                    {link.icon}
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Contact Us</h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <p key={index} className="flex items-center gap-3 text-gray-200">
                  {info.icon}
                  <span>{info.type === 'phone' ? `Emergency: ${info.value}` : info.value}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          {showNewsletter && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Stay Informed</h3>
              <p className="text-gray-200 text-sm">Subscribe to our newsletter for safety tips and updates.</p>
              
              {status.type && (
                <div className={`rounded-lg p-4 mb-4 ${
                  status.type === 'success' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
                }`}>
                  <p>{status.message}</p>
                </div>
              )}

              <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#FFD700] transition-colors"
                  required
                />

                <button 
                  type="button"
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="w-full px-4 py-2 text-sm text-[#FFD700] hover:text-white transition-colors text-left"
                >
                  {showPreferences ? '- Hide notification preferences' : '+ Customize notification preferences'}
                </button>

                {showPreferences && (
                  <div className="space-y-2 p-4 bg-white/5 rounded-lg">
                    {Object.entries(formData.preferences).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => togglePreference(key as keyof NotificationPreferences)}
                          className="rounded border-white/20 bg-white/10 checked:bg-[#FFD700] checked:border-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-200 capitalize">
                          {key.replace(/_/g, ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-[#FFD700] text-[#006838] font-bold hover:bg-white transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-200">
              © {new Date().getFullYear()} Ogun State Community, Social and Security Corps. All rights reserved.
            </p>
            {/* <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-200 hover:text-[#FFD700] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-200 hover:text-[#FFD700] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-200 hover:text-[#FFD700] transition-colors">
                Sitemap
              </a>
            </div> */}
            <PolicyModals />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;