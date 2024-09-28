import dashboardService from "@/services/dashboardService";
import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  // CartesianGrid,
  // Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import moment from "moment";
import UserSvg from "./svgs/userSvg";

type dashResponse = {
  numUsers?: number;
  numPlants?: number;
  numPlantCategory?: number;
  newUsers: [
    {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
    }
  ];
  plantsPerMonth?: [
    {
      plantsAdded: number;
      name: string;
    }
  ];
};

const Dashboard = () => {
  const [dashData, setDashData] = useState<dashResponse | undefined>();

  useEffect(() => {
    populateDash();
  }, []);

  async function populateDash() {
    try {
      // const { data }: { data: dashResponse } =
      const { data } = await dashboardService.getAdminDashboard();
      if (data?.data) {
        setDashData(data?.data);
      } else {
        setDashData(undefined);
      }
    } catch (error) {
      setDashData(undefined);
    }
  }

  console.log(dashData);

  return (
    <>
      <div className="flex-1 space-y-4 px-4 pb-8  pt-5">
        <div className=" space-y-2 ">
          <h2 className="text-3xl font-bold tracking-tight ">Dashboard</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          <Card>
            <CardHeader>
              <CardTitle className=" text-lg font-medium">
                Total Plants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold ">{dashData?.numPlants}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className=" text-lg font-medium">
                Total Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{dashData?.numPlantCategory}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className=" text-lg font-medium">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{dashData?.numUsers}</p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className=" text-lg font-medium">Last Login</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-normal">
                {moment().format("MM-DD-YYYY HH:MM:SS")}
              </p>
            </CardContent>
          </Card> */}
        </div>
      </div>
      <div
        className="grid md:gap-4 md:grid-cols-2 lg:grid-cols-7 px-4 "
        // style={{ minHeight: 350 }}
      >
        <Card className="md:col-span-2  lg:col-span-4 mb-3">
          <CardHeader>
            <CardTitle className=" font-semibold leading-none tracking-tight text-lg">
              Plants added by month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={150}
                height={40}
                data={dashData?.plantsPerMonth || []}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}

                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Bar
                  dataKey="plantsAdded"
                  fill="#023020"
                  radius={[5, 5, 0, 0]}
                  // style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 mb-3">
          <CardHeader>
            <CardTitle className=" font-semibold leading-none tracking-tight text-lg">
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashData?.newUsers?.length
              ? dashData.newUsers.map((user, index) => (
                  <div className="flex items-center py-2" key={index}>
                    <span className="relative flex shrink-0 overflow-hidden ">
                      <UserSvg className="h-9 w-9" />
                    </span>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm ">
                      {moment(user.createdAt).format("MM-DD-YYYY")}
                    </div>
                  </div>
                ))
              : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
