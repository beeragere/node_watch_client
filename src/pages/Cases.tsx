import { caseApi } from "@/api/cases.api";
import AppHeader from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cases() {
  const queryClient = useQueryClient();
  const { data: cases, isLoading } = useQuery({
    queryKey: ["cases"],
    queryFn: caseApi.getAll,
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    caseId: "",
    title: "",
    status: "open",
    severity: "S1",
    serverGroupId: "",
    vendorId: "",
  });

  const addCaseMutation = useMutation({
    mutationFn: (data: {
      caseId: string;
      title: string;
      status: string;
      severity: string;
      serverGroupId: number;
      vendorId: number;
    }) => caseApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      setForm({
        caseId: "",
        title: "",
        status: "open",
        severity: "S1",
        serverGroupId: "",
        vendorId: "",
      });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCaseMutation.mutate({
      ...form,
      serverGroupId: Number(form.serverGroupId),
      vendorId: Number(form.vendorId),
    });
  };

  // 🔹 Pagination State
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const totalCases = cases?.length || 0;
  const totalPages = Math.ceil(totalCases / pageSize);

  const paginatedCases =
    cases?.slice((page - 1) * pageSize, page * pageSize) || [];

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Loading cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <AppHeader title="Cases" />

      <div className="flex justify-between items-center">
        <CardTitle>All Cases</CardTitle>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Case</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Case</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caseId">Case ID</Label>
                <Input
                  id="caseId"
                  value={form.caseId}
                  onChange={(e) => setForm({ ...form, caseId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(val) => setForm({ ...form, status: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="onhold">On Hold</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select
                    value={form.severity}
                    onValueChange={(val) => setForm({ ...form, severity: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S1">S1</SelectItem>
                      <SelectItem value="S2">S2</SelectItem>
                      <SelectItem value="S3">S3</SelectItem>
                      <SelectItem value="S4">S4</SelectItem>
                      <SelectItem value="S5">S5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serverGroupId">Server Group ID</Label>
                  <Input
                    id="serverGroupId"
                    type="number"
                    value={form.serverGroupId}
                    onChange={(e) =>
                      setForm({ ...form, serverGroupId: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendorId">Vendor ID</Label>
                  <Input
                    id="vendorId"
                    type="number"
                    value={form.vendorId}
                    onChange={(e) =>
                      setForm({ ...form, vendorId: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addCaseMutation.isPending}
              >
                {addCaseMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Adding...
                  </div>
                ) : (
                  "Add Case"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Case Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Server Group</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(paginatedCases || []).map((c: any) => (
                  <TableRow
                    key={c.id}
                    onClick={() => navigate(`/cases/${c.id}`)}
                  >
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.caseId}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>{c.severity}</TableCell>
                    <TableCell>{c.serverGroup?.name}</TableCell>
                    <TableCell>{c.vendor?.name}</TableCell>
                    <TableCell>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePrev} disabled={page === 1}>
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages || 1}
            </span>
            <Button onClick={handleNext} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
