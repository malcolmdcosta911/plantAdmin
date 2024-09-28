import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { useEffect, useState } from "react";
import userService from "../services/userService";
import { UserInterface } from "@/models/UserModel";

const UsersPage = () => {
  const [tableData, setTableData] = useState<UserInterface[]>([]);

  useEffect(() => {
    populateUsers();
  }, []);

  async function populateUsers() {
    try {
      const { data } = await userService.getAllUsers();
      if (data?.data && data.data?.users) {
        setTableData(data.data?.users);
      } else {
        setTableData([]);
      }
    } catch (error) {
      setTableData([]);
    }
  }

  const users = tableData.length
    ? tableData.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: moment(user.createdAt).format("MM-DD-YYYY"),
        phone: user.phone,
      }))
    : [];

  return (
    <div className="p-4">
      <div className=" space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight ">Users</h2>
      </div>

      <div className=" my-2 flex justify-center">
        <div className="w-4/5">
          <Table className="border ">
            <TableCaption>A list of users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="">Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.length ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell className="">{user.createdAt}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
