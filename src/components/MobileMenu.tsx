
import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SocialLinks from '@/components/SocialLinks';
import { useLanguage } from '@/context/LanguageContext';

const MobileMenu: React.FC = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.musicTools'), href: '/tools' },
    { name: t('nav.artists'), href: '/artists' },
  ];

  return (
    <Sheet>
      <SheetTrigger className="md:hidden" aria-label="Menu">
        <Menu className="h-5 w-5 text-white hover:text-yeon-orange transition-colors" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-yeon-dark-bg border-yeon-dark-bg">
        <SheetHeader>
          <SheetTitle className="text-white">{t('menu')}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 mt-6">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                className="text-white/70 hover:text-white transition-colors py-2"
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
