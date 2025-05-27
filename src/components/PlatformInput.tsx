import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";
import { Platform } from "@/data/platforms";
import { Info } from "lucide-react";

interface PlatformInputProps {
  platform: Platform;
  value: number;
  onChange: (value: number) => void;
}

const PlatformInput: React.FC<PlatformInputProps> = ({
  platform,
  value,
  onChange,
}) => {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const formatRate = (rate: number): string => {
    return `$${rate.toFixed(4)}`;
  };

  const fallbackLogo =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMTguNzVDNi4wODkgMTguNzUgMS4yNSAxMy45MTEgMS4yNSA4QzEuMjUgNC40MjYgMy4yNjYgMS4yOTMgNi4yNiAwLjIyNUM2LjQ2OSAwLjE1MiA2LjcgMC4xODkgNi44NzEgMC4zMjJDNy4wNDMgMC40NTYgNy4xMjUgMC42NzIgNy4wODUgMC44ODZDNi41MjEgMy44MzIgNy41MTkgNi44NzcgOS42NDcgOC44N0M5LjgyNCA5LjAzOSAxMC4wMjIgOS4xODMgMTAuMjM0IDkuM0M5LjcwOCA3LjgxNSA5LjU3NSA2LjIxMSA5Ljg1MSA0LjY2MkM5Ljk3NCA0LjA3OSAxMC4xNDYgMy41MDkgMTAuMzYzIDIuOTZDMTAuNDQgMi43NTYgMTAuNjQgMi42MjUgMTAuODU3IDIuNjI1QzExLjA3NSAyLjYyNSAxMS4yNzUgMi43NTYgMTEuMzUxIDIuOTZDMTIuMTcxIDUuMDggMTIuMDM0IDcuNDQ4IDEwLjk4IDkuNDY0QzEyLjEzNiA5LjE3NSAxMy4zNDcgOS4wMjcgMTQuNTMxIDkuMDJDMTYuNzQ4IDkuMDA3IDE4LjgwNSA5LjcwNCAyMC4zNzggMTEuMDRDMjAuNTQ3IDExLjE4NCAyMC42MDcgMTEuNDE0IDIwLjUzMiAxMS42MjJDMjAuNDU2IDExLjgzMSAyMC4yNiAxMS45NzMgMjAuMDM5IDExLjk3M0MxOS45OTIgMTEuOTczIDE5Ljk0NiAxMS45NjcgMTkuOSAxMS45NTZDMTguMDE0IDExLjUwOSAxNS44ODcgMTIuMDk1IDE0LjU3OSAxMy41MjdDMTQuNTggMTMuNTI3IDE0LjU4IDEzLjUyNyAxNC41NzkgMTMuNTI3QzE0LjQyNCAxMy42OTcgMTQuMjg0IDEzLjg3OSAxNC4xNiAxNC4wNjlDMTUuNCAyMC4xMzQgOC42IDE4LjgyMSA4LjYgMjMuNUM4LjYgMjMuNzc2IDguMzc2IDI0IDguMSAyNEM3Ljg5OSAyNCA3LjcyMyAyMy44OTQgNy42NTMgMjMuNzA3QzUuOTU5IDIwLjMxNSA4LjM1MiAxNi42ODQgMTIgMTguNzVaTTkuNjY0IDQuNzU0QzkuNTE0IDUuODg4IDkuNTg0IDcuMDQ4IDkuODc3IDguMTU5QzEwLjUwOCA3LjUwMiAxMC45MTkgNi42NyAxMS4wNjYgNS43NjdDMTAuODAyIDUuMzc3IDEwLjU3OCA0Ljk4NiA5LjY2NCA0Ljc1NFpNMTEuNTQxIDE0LjkwOEMxMS41NDEgMTQuOTA4IDExLjU0MSAxNC45MDggMTEuNTQxIDE0LjkwOEwxMS41NDEgMTQuOTA4QzExLjU0MSAxNC45MDggMTEuNTQxIDE0LjkwOCAxMS41NDEgMTQuOTA4WiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+";

  return (
    <div className="flex flex-col p-4 rounded-xl bg-[#2A2A2A] border border-white/5 hover:border-gray-500 transition-all">
      <div className="flex items-center mb-3 gap-3">
        <div
          className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center p-1"
          style={{
            backgroundColor:
              platform.id === "deezer"
                ? "#000000" + "30"
                : `${platform.color}30`,
          }}
        >
          <img
            src={imageError ? fallbackLogo : platform.logo}
            alt={platform.name}
            className="w-7 h-7 object-contain"
            onError={() => setImageError(true)}
          />
        </div>
        <Label htmlFor={platform.id} className="text-lg font-medium">
          {platform.name}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-auto text-muted-foreground hover:text-foreground cursor-help">
                <Info className="h-4 w-4" />
              </span>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-1">
              <p>
                {t("perStreamTooltip")}: {formatRate(platform.rate)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative mt-1">
        <Input
          id={platform.id}
          type="number"
          inputMode="numeric"
          min="0"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-[#121212] border-white/10 focus:border-[#FF3C27]"
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default PlatformInput;
