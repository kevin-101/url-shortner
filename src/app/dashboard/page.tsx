import GenerateField from "@/components/GenerateField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getLinks } from "@/lib/getLinks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DashboardPage() {
  const session = await auth();

  const links = await getLinks();

  return (
    <div className="flex flex-col gap-3 px-5 xl:px-80 py-5 md:py-10 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold pl-2">Dashboard</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create new URL</CardTitle>
          </CardHeader>
          <CardContent>
            <GenerateField session={session} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">Card Content</p>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Shortned URL</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links?.map((link) => (
            <TableRow key={link.slug}>
              <TableCell className="font-medium">{link.slug}</TableCell>
              <TableCell>{link.url}</TableCell>
              <TableCell>
                {new Date(link.created_at as string).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
