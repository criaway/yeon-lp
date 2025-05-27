
import React from 'react';
import { DistributorRevenue } from '@/hooks/useCalculator';
import { Distributor } from '@/data/distributors';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, InfoIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DistributorResultsSectionProps {
  distributorResults: DistributorRevenue[];
  distributors: Distributor[];
  totalRevenue: number;
  selectedDistributor: string | null;
  onSelectDistributor: (id: string | null) => void;
  visible: boolean;
}

const DistributorResultsSection: React.FC<DistributorResultsSectionProps> = ({
  distributorResults,
  distributors,
  totalRevenue,
  selectedDistributor,
  onSelectDistributor,
  visible
}) => {
  const { t } = useLanguage();
  
  if (!visible) return null;
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getDistributor = (id: string) => distributors.find(d => d.id === id);
  
  // Get the selected distributor data if available
  const selectedDistributorData = selectedDistributor 
    ? distributorResults.find(d => d.distributorId === selectedDistributor)
    : null;

  return (
    <div className={`mt-8 animate-fade-in`}>
      <div className="bg-yeon-darker-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 bg-secondary/50">
          <h3 className="text-lg font-semibold">{t('distributorFees')}</h3>
        </div>

        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            {t('distributorFeesInfo')}
          </p>
          
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg mb-4 text-sm">
            <InfoIcon size={16} className="text-yeon-orange" />
            <p className="text-white/80">
              {t('distributorFeesDisclaimer')}
            </p>
          </div>
          
          {/* Distributor Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">{t('distributor')}</TableHead>
                <TableHead className="text-white/70 text-right">{t('fee')}</TableHead>
                <TableHead className="text-white/70 text-right">{t('netRevenue')}</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributorResults.map((result) => {
                const distributor = getDistributor(result.distributorId);
                if (!distributor) return null;
                
                const isSelected = selectedDistributor === distributor.id;
                
                return (
                  <TableRow 
                    key={distributor.id} 
                    className={`border-white/5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-yeon-orange/10 hover:bg-yeon-orange/15' : 'hover:bg-white/5'
                    }`}
                    onClick={() => onSelectDistributor(isSelected ? null : distributor.id)}
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-secondary p-1">
                          <img 
                            src={distributor.logo} 
                            alt={distributor.name} 
                            className="w-6 h-6 object-contain" 
                          />
                        </div>
                        <span className="font-medium">{distributor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <span className="text-muted-foreground">{distributor.feesPercentage}%</span>
                      <p className="text-sm text-white/50">{formatCurrency(result.fee)}</p>
                    </TableCell>
                    <TableCell className="text-right py-3 font-semibold">
                      {formatCurrency(result.netAmount)}
                    </TableCell>
                    <TableCell className="py-3">
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform ${isSelected ? 'rotate-180' : ''}`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {/* Selected distributor details */}
          {selectedDistributorData && selectedDistributor && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-secondary p-0.5">
                    <img 
                      src={getDistributor(selectedDistributor)?.logo} 
                      alt={getDistributor(selectedDistributor)?.name} 
                      className="w-4 h-4 object-contain" 
                    />
                  </div>
                  <span className="font-medium">{getDistributor(selectedDistributor)?.name} {t('breakdown')}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {getDistributor(selectedDistributor)?.feesPercentage}% {t('fee')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">{t('grossRevenue')}</p>
                  <p className="text-lg font-medium">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground">{t('feeAmount')}</p>
                  <p className="text-lg font-medium">{formatCurrency(selectedDistributorData.fee)}</p>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-yeon-orange/10 border border-yeon-orange/20">
                  <p className="text-sm text-muted-foreground">{t('netRevenue')}</p>
                  <p className="text-xl font-bold text-yeon-orange">{formatCurrency(selectedDistributorData.netAmount)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributorResultsSection;
