import {
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Pause,
  Play,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allAgents = [
  {
    id: 1,
    name: "Customer Support Bot",
    type: "Support",
    status: "active",
    model: "GPT-4",
    requests: 1247,
    lastActive: "2 minutes ago",
    accuracy: 94,
    description: "Handles customer inquiries and support tickets",
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
    description: "Assists with lead qualification and sales processes",
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
    description: "Creates marketing content and blog posts",
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
    description: "Analyzes data patterns and generates insights",
  },
  {
    id: 5,
    name: "Email Assistant",
    type: "Support",
    status: "paused",
    model: "GPT-4",
    requests: 678,
    lastActive: "1 minute ago",
    accuracy: 92,
    description: "Manages email responses and scheduling",
  },
  {
    id: 6,
    name: "Code Reviewer",
    type: "Development",
    status: "paused",
    model: "Claude-3",
    requests: 123,
    lastActive: "3 hours ago",
    accuracy: 88,
    description: "Reviews code and suggests improvements",
  },
];

export function AgentsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleAgentClick = (agentId: number) => {
    navigate(`/agents/${agentId}`);
  };

  const filteredAgents = allAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && agent.status === "active";
    if (activeTab === "paused")
      return matchesSearch && agent.status === "paused";

    return matchesSearch;
  });

  const activeAgents = allAgents.filter((agent) => agent.status === "active").length;
  const pausedAgents = allAgents.filter((agent) => agent.status === "paused").length;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">AI Agents</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage and monitor all your AI agents
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search agents..."
              className="pl-4 w-full rounded-lg bg-sidebar-accent-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-sidebar-accent-foreground">
              <Filter className="mr-2 h-4 w-4 text-card-box" />
            </Button>
            <Button
              className="bg-card-box whitespace-nowrap"
              onClick={() => navigate("/agents/create")}
            >
              Create Agent
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="flex flex-wrap gap-2 px-2">
  <TabsTrigger
    className="text-blue-900 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white px-2 py-1 text-sm sm:px-8 sm:py-5 sm:text-base mt-2"
    value="all"
  >
    All Agents ({allAgents.length})
  </TabsTrigger>
  <TabsTrigger
    className="text-blue-900 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white px-2 py-1 text-sm sm:px-8 sm:py-5 sm:text-base mt-2"
    value="active"
  >
    Active ({activeAgents})
  </TabsTrigger>
  <TabsTrigger
    className="text-blue-900 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white px-2 py-1 text-sm sm:px-8 sm:py-5 sm:text-base mt-2"
    value="paused"
  >
    Paused ({pausedAgents})
  </TabsTrigger>
</TabsList>
        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-full text-sm">
                  <TableHeader>
                    <TableRow>
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
                  <TableBody>
                    {filteredAgents.map((agent) => (
                      <TableRow
                        key={agent.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          {agent.name}
                        </TableCell>
                        <TableCell className="text-gray-600 whitespace-nowrap">
                          {agent.type}
                        </TableCell>
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
                        <TableCell className="text-gray-600 whitespace-nowrap">
                          {agent.model}
                        </TableCell>
                        <TableCell className="text-gray-600 whitespace-nowrap">
                          {agent.requests.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-600 whitespace-nowrap">
                          {agent.accuracy}%
                        </TableCell>
                        <TableCell className="text-gray-500 whitespace-nowrap">
                          {agent.lastActive}
                        </TableCell>
                        <TableCell>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
