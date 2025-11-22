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
import Link from "next/link";

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

      <Card>
        <CardHeader>
          <CardTitle>Generated Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Shortned URL</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Date Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links?.length === 0 ? (
                <TableRow className="text-center">
                  <TableCell colSpan={3}>No links generated</TableCell>
                </TableRow>
              ) : (
                links!.map((link) => (
                  <TableRow key={link.slug}>
                    <TableCell className="font-medium">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL!}/${
                          link.slug
                        }`}
                        className="hover:underline"
                      >
                        {`${process.env.NEXT_PUBLIC_BASE_URL!}/${link.slug}`}
                      </Link>
                    </TableCell>
                    <TableCell>{link.url}</TableCell>
                    <TableCell>
                      {new Date(link.created_at as string).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
