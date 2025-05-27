import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface FeatureItemProps {
  title: string;
  description: string;
  size?: "small" | "large";
  tag?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  size = "small",
  tag,
}) => {
  return (
    <Card
      className={cn(
        "h-full border-0 rounded-xl transition-all duration-300 hover:scale-105 bg-[#222222] hover:bg-[#333333]",
        size === "large" ? "md:col-span-2" : "",
      )}
    >
      <CardContent className="flex flex-col h-full p-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          {tag && (
            <Badge className="bg-yeon-orange hover:bg-yeon-orange text-xs">
              {tag}
            </Badge>
          )}
        </div>
        <p className="text-white/80 mb-auto text-sm md:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureItem;
