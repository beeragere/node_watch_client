import { serverApi } from "@/api/server.api";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Servers() {
  const queryClient = useQueryClient();
  const { data: servers } = useQuery({
    queryKey: ["servers"],
    queryFn: serverApi.getAll,
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    ipAddress: "",
    email: "",
    ownerName: "",
    osType: "",
    version: "",
    moreDetails: "",
  });

  const addServerMutation = useMutation({
    mutationFn: serverApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      setForm({
        name: "",
        ipAddress: "",
        email: "",
        ownerName: "",
        osType: "",
        version: "",
        moreDetails: "",
      });
      setOpen(false); // ✅ close modal after success
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addServerMutation.mutate(form);
  };

  return (
    <div className="p-6 space-y-6">
      <AppHeader title="Servers" />

      <div className="flex justify-between items-center">
        <CardTitle>All Servers</CardTitle>

        {/* Add Server Button + Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Server</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Server</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Server Name" },
                { id: "ipAddress", label: "IP Address" },
                { id: "email", label: "Email" },
                { id: "ownerName", label: "Owner Name" },
                { id: "osType", label: "OS Type" },
                { id: "version", label: "Version" },
                { id: "moreDetails", label: "More Details" },
              ].map(({ id, label }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    value={form[id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <Button
                type="submit"
                className="w-full"
                disabled={addServerMutation.isPending}
              >
                {addServerMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Adding...
                  </div>
                ) : (
                  "Add Server"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table of servers */}
      <Card>
        <CardHeader>
          <CardTitle>All Servers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>OS</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Cases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(servers || []).map((srv: any) => (
                  <TableRow key={srv.id}>
                    <TableCell>{srv.id}</TableCell>
                    <TableCell>{srv.name}</TableCell>
                    <TableCell>{srv.ip}</TableCell>
                    <TableCell>{srv.email}</TableCell>
                    <TableCell>{srv.owner}</TableCell>
                    <TableCell>{srv.os}</TableCell>
                    <TableCell>{srv.version}</TableCell>
                    <TableCell>{srv.details}</TableCell>
                    <TableCell>{srv.cases}</TableCell>
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
