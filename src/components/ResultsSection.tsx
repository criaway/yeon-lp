
import React from 'react';
import { Revenue } from '@/hooks/useCalculator';
import { Platform } from '@/data/platforms';
import { useLanguage } from '@/context/LanguageContext';

interface ResultsSectionProps {
  results: Revenue[];
  platforms: Platform[];
  totalRevenue: number;
  visible: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, platforms, totalRevenue, visible }) => {
  const { t } = useLanguage();
  
  if (!visible) return null;
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Find the platform with the highest revenue
  const maxRevenuePlatform = [...results].sort((a, b) => b.amount - a.amount)[0];
  const getPlatform = (id: string) => platforms.find(p => p.id === id);

  return (
    <div className={`mt-8 animate-fade-in`}>
      <div className="bg-yeon-darker-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 bg-secondary/50">
          <h3 className="text-lg font-semibold">{t('estimatedRevenue')}</h3>
        </div>

        {/* Results Table */}
        <div className="p-4">
          <div className="space-y-4">
            {results.map((result) => {
              const platform = getPlatform(result.platformId);
              if (!platform || result.streams === 0) return null;
              
              const isHighest = maxRevenuePlatform?.platformId === result.platformId;
              
              return (
                <div 
                  key={result.platformId}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isHighest ? 'bg-yeon-orange/10 border border-yeon-orange/20' : 'bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center p-1"
                      style={{ backgroundColor: `${platform.color}30` }}
                    >
                      <img 
                        src={platform.logo} 
                        alt={platform.name} 
                        className="w-6 h-6 object-contain" 
                      />
                    </div>
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.streams.toLocaleString()} {t('streamCount')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(result.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      @ ${platform.rate.toFixed(4)} / {t('streamCount')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div className="p-4 border-t border-white/10 bg-secondary/30">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{t('totalRevenue')}</h3>
            <p className="text-xl font-bold text-yeon-orange">{formatCurrency(totalRevenue)}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t('disclaimerText')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
