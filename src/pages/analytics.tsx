import { Activity, Bot, Clock, MessageSquare, Users, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/dashboard-card";

const data = {
  stats: [
    {
      title: "Total Requests",
      value: "12,847",
      change: "2",
      icon: MessageSquare,
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "5",
      icon: Users,
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "7",
      icon: Clock,
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "8",
      icon: Activity,
    },
  ],
};
export function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Monitor performance and usage across all your AI agents
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>
                  Daily requests over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Request volume over time
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>
                  Average response times by agent type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Response time distribution
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Comparison</CardTitle>
              <CardDescription>
                Compare accuracy and response times across agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Agent performance metrics
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Hours</CardTitle>
                <CardDescription>
                  When your agents are most active
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Usage by hour
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Request Types</CardTitle>
                <CardDescription>
                  Distribution of request categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Request type breakdown
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
