// components/StatCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // adjust import based on your UI library

interface StatCardProps {
  title: string;
  value: number | string;
  change: number| string;
  icon: React.ElementType;
}

const DashboardCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
}) => {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-15 h-15 bg-card-box rounded-xl flex items-center justify-center">
            <Icon className="h-6 w-6 text-background" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-600 truncate">
              {title}
            </p>
            <span className="text-xs text-orange-500 font-medium bg-orange-100 px-2 py-1 rounded-xl">
              {change}%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
