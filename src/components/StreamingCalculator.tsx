import React, { useState, useEffect } from "react";
import { platforms } from "@/data/platforms";
import { distributors } from "@/data/distributors";
import { useCalculator } from "@/hooks/useCalculator";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import PlatformInput from "./PlatformInput";
import ResultsSection from "./ResultsSection";
import DistributorResultsSection from "./DistributorResultsSection";
import RevenueBoostInsights from "./RevenueBoostInsights";

const StreamingCalculator: React.FC = () => {
  const { t } = useLanguage();

  const {
    streamData,
    updateStreamCount,
    calculateRevenue,
    resetCalculator,
    selectDistributor,
    results,
    distributorResults: calculatorDistributorResults,
    totalRevenue,
    hasCalculated,
    selectedDistributor,
    calculateDistributorFees,
  } = useCalculator(platforms);

  const [distributorResultsState, setDistributorResults] = useState<
    Array<{
      distributorId: string;
      fee: number;
      netAmount: number;
    }>
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRevenue();

    // Calculate distributor fees after calculating revenue
    if (totalRevenue > 0) {
      calculateDistributorFees(totalRevenue, distributors);
    }
  };

  // This effect recalculates distributor fees when totalRevenue changes
  useEffect(() => {
    if (totalRevenue > 0 && hasCalculated) {
      const results = distributors.map((distributor) => {
        const fee = totalRevenue * (distributor.feesPercentage / 100);
        const netAmount = totalRevenue - fee;

        return {
          distributorId: distributor.id,
          fee,
          netAmount,
        };
      });

      setDistributorResults(results);
    }
  }, [totalRevenue, hasCalculated]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <PlatformInput
              key={platform.id}
              platform={platform}
              value={streamData[platform.id] || 0}
              onChange={(value) => updateStreamCount(platform.id, value)}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button
            type="submit"
            size="lg"
            className="bg-yeon-orange hover:bg-yeon-dark-orange text-white font-medium px-8"
          >
            {t("calculateButton")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={resetCalculator}
            className="border-white/10 hover:bg-secondary"
          >
            {t("resetButton")}
          </Button>
        </div>
      </form>

      <ResultsSection
        results={results}
        platforms={platforms}
        totalRevenue={totalRevenue}
        visible={hasCalculated}
      />

      {hasCalculated && totalRevenue > 0 && (
        <>
          <RevenueBoostInsights
            results={results}
            platforms={platforms}
            totalRevenue={totalRevenue}
            visible={hasCalculated}
          />
          <DistributorResultsSection
            distributorResults={distributorResultsState}
            distributors={distributors}
            totalRevenue={totalRevenue}
            selectedDistributor={selectedDistributor}
            onSelectDistributor={selectDistributor}
            visible={hasCalculated}
          />
        </>
      )}
    </div>
  );
};

export default StreamingCalculator;
