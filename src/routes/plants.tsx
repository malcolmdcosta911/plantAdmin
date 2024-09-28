import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlantInterface } from "@/models/PlantModel";
import plantsService from "@/services/plantsService";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

const PlantsPage = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<PlantInterface[]>([]);
  const imageUrl = import.meta.env.VITE_APP_UPLOAD_IMG_URL;

  useEffect(() => {
    populatePlants();
  }, []);

  async function populatePlants() {
    try {
      // const { data }: { data: dashResponse } =
      const { data } = await plantsService.getAllPlants();
      if (data?.data && data.data?.plants) {
        setTableData(data.data?.plants);
      } else {
        setTableData([]);
      }
    } catch (error) {
      setTableData([]);
    }
  }

  async function handleDeletePlant(id: string) {
    try {
      await plantsService.deletePlant(id);
    } catch (error) {
      //err
    } finally {
      populatePlants();
    }
  }

  function handleViewPlant(id: string) {
    navigate(`/plants/${id}`);
  }

  const plants = tableData.length
    ? tableData.map((plant) => ({
        id: plant._id,
        name: plant.name,
        location: plant.location.coordinates.join(),
        createdAt: moment(plant.createdAt).format("MM-DD-YYYY"),
        category: plant.categories.map((cat) => cat.name).join(),
        image: plant.images[0].filename,
      }))
    : [];
  // console.log("tableData", tableData, plants);
  //http://localhost:3500/images/images-1711633299887.jpg
  return (
    <div className="p-3">
      <div className=" space-y-2 ">
        <h2 className="text-3xl font-bold tracking-tight ">Plants</h2>
      </div>

      <div className=" my-2 flex justify-center">
        <div className="w-4/5">
          <div className="my-3 flex justify-end">
            <Button
              onClick={() => {
                navigate("/plants/new");
              }}
            >
              Add plant
            </Button>
          </div>
          <Table className="border ">
            <TableCaption>A list of plants</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5">Edit</TableHead>
                <TableHead className="w-12">Image</TableHead>
                <TableHead className="">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="">Created At</TableHead>
                <TableHead className="w-5">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plants?.length ? (
                plants.map((plant) => (
                  <TableRow key={plant.id}>
                    <TableCell className="">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewPlant(plant.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>

                    <TableCell className="">
                      <img
                        src={`${imageUrl}${plant.image}`}
                        alt=""
                        className="object-contain w-10 h-10 "
                        // style={{ width: "100%", objectFit: "contain" }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{plant.name}</TableCell>
                    <TableCell>{plant.category}</TableCell>
                    <TableCell>{plant.location}</TableCell>
                    <TableCell className="">{plant.createdAt}</TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        className="ml-2"
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeletePlant(plant.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
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

export default PlantsPage;
