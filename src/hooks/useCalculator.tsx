import { useState } from "react";
import { Platform } from "@/data/platforms";
import { Distributor } from "@/data/distributors";

export interface StreamData {
  [platformId: string]: number;
}

export interface Revenue {
  platformId: string;
  streams: number;
  amount: number;
}

export interface DistributorRevenue {
  distributorId: string;
  fee: number;
  netAmount: number;
}

export function useCalculator(platforms: Platform[]) {
  const [streamData, setStreamData] = useState<StreamData>(() => {
    const initialData: StreamData = {};
    platforms.forEach((platform) => {
      initialData[platform.id] = 0;
    });
    return initialData;
  });

  const [results, setResults] = useState<Revenue[]>([]);
  const [distributorResults, setDistributorResults] = useState<
    DistributorRevenue[]
  >([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(
    null,
  );

  const updateStreamCount = (platformId: string, count: number) => {
    setStreamData((prev) => ({
      ...prev,
      [platformId]: count,
    }));
  };

  const calculateRevenue = () => {
    const calculatedResults: Revenue[] = platforms.map((platform) => {
      const streams = streamData[platform.id] || 0;
      const amount = streams * platform.rate;

      return {
        platformId: platform.id,
        streams,
        amount,
      };
    });

    setResults(calculatedResults);

    const total = calculatedResults.reduce((sum, item) => sum + item.amount, 0);
    setTotalRevenue(total);
    setHasCalculated(true);

    // Calculate distributor revenues
    calculateDistributorFees(total);
  };

  const calculateDistributorFees = (
    totalAmount: number,
    distributors?: Distributor[],
  ) => {
    if (!distributors || distributors.length === 0) return;

    const calculatedDistributorResults: DistributorRevenue[] = distributors.map(
      (distributor) => {
        const fee = totalAmount * (distributor.feesPercentage / 100);
        const netAmount = totalAmount - fee;

        return {
          distributorId: distributor.id,
          fee,
          netAmount,
        };
      },
    );

    setDistributorResults(calculatedDistributorResults);
  };

  const resetCalculator = () => {
    const resetData: StreamData = {};
    platforms.forEach((platform) => {
      resetData[platform.id] = 0;
    });

    setStreamData(resetData);
    setResults([]);
    setDistributorResults([]);
    setTotalRevenue(0);
    setHasCalculated(false);
    setSelectedDistributor(null);
  };

  const selectDistributor = (distributorId: string | null) => {
    setSelectedDistributor(distributorId);
  };

  return {
    streamData,
    updateStreamCount,
    calculateRevenue,
    calculateDistributorFees,
    resetCalculator,
    selectDistributor,
    results,
    distributorResults,
    totalRevenue,
    hasCalculated,
    selectedDistributor,
  };
}
