"use client";
import {
  Activity,
  Bot,
  Clock,
  ChevronRight,
  Edit,
  Eye,
  MoreHorizontal,
  Pause,
  Play,
  Trash2,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback } from "react";
import DashboardCard from "@/components/dashboard-card";

const data = {
  agents: [
    {
      id: 1,
      name: "Customer Support Bot",
      type: "Support",
      status: "active",
      model: "GPT-4",
      requests: 1247,
      lastActive: "2 minutes ago",
      accuracy: 94,
    },
    {
      id: 2,
      name: "Sales Assistant",
      type: "Sales",
      status: "active",
      model: "Claude-3",
      requests: 892,
      lastActive: "5 minutes ago",
      accuracy: 89,
    },
    {
      id: 3,
      name: "Content Generator",
      type: "Content",
      status: "paused",
      model: "GPT-4",
      requests: 456,
      lastActive: "1 hour ago",
      accuracy: 96,
    },
    {
      id: 4,
      name: "Data Analyzer",
      type: "Analytics",
      status: "active",
      model: "Gemini Pro",
      requests: 234,
      lastActive: "10 minutes ago",
      accuracy: 91,
    },
  ],
  stats: [
    {
      title: "Total Agents",
      value: "24",
      change: "2",
      icon: Bot,
    },
    {
      title: "Active Requests",
      value: "2,847",
      change: "3",
      icon: Activity,
    },
    {
      title: "Response Time",
      value: "1.2s",
      change: "4",
      icon: Clock,
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "5",
      icon: Zap,
    },
  ],
};

export function DashboardPage() {
  const navigate = useNavigate();

  const handleAgentClick = useCallback(
    (agentId: number) => {
      navigate(`/agents/${agentId}`);
    },
    [navigate]
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-card-back">
      {/* Stats Cards */}
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

      {/* Recent Agents Table */}
      <Card className="py-6">
        <CardHeader>
          <div className="flex items-center justify-between -mb-6">
            <div>
              <CardTitle className="font-bold">Recent AI Agents</CardTitle>
              {/* <CardDescription>
                Your most recently active agents
              </CardDescription> */}
            </div>
            <Button
              className="flex items-center gap-0.5 text-sm text--primary bg-orange-100 rounded-full"
              variant="outline"
              onClick={() => navigate("/agents")}
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table className="[&_tr]:border-b-gray-100 [&_tr:last-child]:border-b-0">
            <TableHeader className="[&_tr]:border-b-gray-100">
              <TableRow className="hover:bg-transparent border-b-gray-100">
                <TableHead>Agent</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-b-0">
              {data.agents.map((agent) => (
                <TableRow
                  key={agent.id}
                  className="border-b-gray-50 hover:bg-gray-25 transition-colors cursor-pointer"
                >
                  <TableCell className="font-normal text-gray-900 px-0">
                    {agent.name}
                  </TableCell>
                  <TableCell className="text-gray-600 ">{agent.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === "active"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {agent.status === "active" ? "Active" : "Paused"}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{agent.model}</TableCell>
                  <TableCell className="text-gray-600">
                    {agent.requests.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {agent.accuracy}%
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {agent.lastActive}
                  </TableCell>
                  <TableCell className="">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleAgentClick(agent.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {agent.status === "active" ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Start
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
