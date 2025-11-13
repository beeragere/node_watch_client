import { caseApi } from "@/api/cases.api";
import AppHeader from "@/components/Header/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: caseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["case", id],
    queryFn: () => caseApi.getById(Number(id)),
  });

  if (isLoading)
    return <div className="p-6 text-center text-gray-500">Loading case...</div>;
  if (error || !caseData)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load case details.
      </div>
    );

  const c = caseData;

  return (
    <div className="p-6 space-y-6">
      <AppHeader title={`Case: ${c.caseId}`} />

      {/* Case Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{c.title}</span>
            <Badge
              variant={
                c.status === "open"
                  ? "default"
                  : c.status === "closed"
                  ? "secondary"
                  : "outline"
              }
            >
              {c.status.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <strong>Case ID:</strong> {c.caseId}
          </div>
          <div>
            <strong>Severity:</strong>{" "}
            <Badge
              variant={
                c.severity === "S1"
                  ? "destructive"
                  : c.severity === "S2"
                  ? "default"
                  : "outline"
              }
            >
              {c.severity}
            </Badge>
          </div>
          <div>
            <strong>Created:</strong> {new Date(c.createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Vendor:</strong>{" "}
            <a
              href={c.vendor?.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {c.vendor?.name}
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Server Details */}
      <Card>
        <CardHeader>
          <CardTitle>Server Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div>
            <strong>Name:</strong> {c.serverGroup?.name}
          </div>
          <div>
            <strong>IP Address:</strong> {c.serverGroup?.ipAddress}
          </div>
          <div>
            <strong>Email:</strong> {c.serverGroup?.email}
          </div>
          <div>
            <strong>Owner:</strong> {c.serverGroup?.ownerName}
          </div>
          <div>
            <strong>OS:</strong> {c.serverGroup?.osType}
          </div>
          <div>
            <strong>Version:</strong> {c.serverGroup?.version}
          </div>
          <div>
            <strong>More Details:</strong> {c.serverGroup?.moreDetails}
          </div>
        </CardContent>
      </Card>

      {/* Messages Section */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(caseData?.messages || []).map((msg: any, idx: number) => {
            // 🧹 Clean message body: remove quoted text
            const cleanBody = msg.body
              ?.split(/\r?\n/)
              .filter(
                (line: string) =>
                  !line.startsWith(">") &&
                  !line.startsWith("On ") &&
                  !line.startsWith("From:") &&
                  !line.includes("wrote:")
              )
              .join("\n")
              .trim();

            // 🕒 Format date safely
            const formattedDate = msg.createdAt
              ? new Date(msg.createdAt).toLocaleString()
              : "Unknown Date";

            return (
              <div
                key={idx}
                className="border rounded-lg p-4 bg-gray-50 space-y-2 text-sm"
              >
                <p className="font-medium">From: {msg.from} &gt;</p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
                <p className="font-semibold">{msg.subject}</p>
                <pre className="whitespace-pre-wrap text-gray-700">
                  {cleanBody || "(no content)"}
                </pre>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
