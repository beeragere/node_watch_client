import { dashboardApi } from "@/api/dashboard.api";
import AppHeader from "@/components/Header/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const { data: summary } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardApi.getSummary,
  });

  const { data: casesByStatus } = useQuery({
    queryKey: ["cases-by-status"],
    queryFn: dashboardApi.getCasesByStatus,
  });

  const { data: casesBySeverity } = useQuery({
    queryKey: ["cases-by-severity"],
    queryFn: dashboardApi.getCasesBySeverity,
  });

  const { data: recentCases } = useQuery({
    queryKey: ["recent-cases"],
    queryFn: dashboardApi.getRecentCases,
  });

  return (
    <div className="p-6 space-y-6">
      <AppHeader />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.groups ?? "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.cases ?? "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.vendors ?? "-"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cases by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Cases by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={casesByStatus || []}
                  dataKey="_count"
                  nameKey="status"
                  outerRadius={100}
                  fill="var(--chart-1)"
                  label={({ name, percent }: any) =>
                    `${name} (${Math.round(percent * 100)}%)`
                  }
                >
                  {(casesByStatus || []).map((_: any, idx: number) => {
                    const root = document.documentElement;
                    const fillColor = getComputedStyle(root).getPropertyValue(
                      `--chart-${(idx % 5) + 1}`
                    );
                    return <Cell key={`cell-${idx}`} fill={fillColor} />;
                  })}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cases by Severity */}
        <Card>
          <CardHeader>
            <CardTitle>Cases by Severity</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={casesBySeverity || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="_count"
                  fill={getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--chart-2")}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(recentCases || []).map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>{c.severity}</TableCell>
                    <TableCell>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
