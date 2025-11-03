import { vendorApi } from "@/api/vendor.api";
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

export default function Vendors() {
  const queryClient = useQueryClient();
  const { data: vendors } = useQuery({
    queryKey: ["vendors"],
    queryFn: vendorApi.getAll,
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    Link: "",
    VendorId: "",
  });

  const addVendorMutation = useMutation({
    mutationFn: vendorApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      setForm({
        name: "",
        Link: "",
        VendorId: "",
      });
      setOpen(false); // ✅ Close modal after success
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVendorMutation.mutate(form);
  };

  return (
    <div className="p-6 space-y-6">
      <AppHeader title="Vendors" />

      <div className="flex justify-between items-center">
        <CardTitle>All Vendors</CardTitle>

        {/* Add Vendor Button + Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Vendor</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Vendor Name" },
                { id: "Link", label: "Vendor Link" },
                { id: "VendorId", label: "Vendor ID" },
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
                disabled={addVendorMutation.isPending}
              >
                {addVendorMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Adding...
                  </div>
                ) : (
                  "Add Vendor"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table of Vendors */}
      <Card>
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Cases Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(vendors || []).map((vendor: any) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>
                      <a
                        href={vendor.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {vendor.Link}
                      </a>
                    </TableCell>
                    <TableCell>{vendor.VendorId}</TableCell>
                    <TableCell>{vendor.cases?.length || 0}</TableCell>
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
