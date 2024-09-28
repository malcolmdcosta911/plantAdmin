import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import categoryService from "@/services/categoryService";
import plantsService from "@/services/plantsService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryInterface, PlantInterface } from "@/models/PlantModel";
import MultiSelectDropdown from "./common/MultiSelectDropdown";
import { Loader2, ChevronLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(255),
  categories: z
    .array(z.string())
    .min(1, "Please select at least one category."),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  longitude: z.coerce
    .number()
    .min(-180, {
      message: "Longitude must be between -180 and 180.",
    })
    .max(180, {
      message: "Longitude must be between -180 and 180.",
    }),
  latitude: z.coerce
    .number()
    .min(-90, {
      message: "Latitude must be between -90 and 90.",
    })
    .max(90, {
      message: "Latitude must be between -90 and 90.",
    }),
  files: z.any(),
});

const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

const convertToFile = async (imgUrl: string): Promise<File> => {
  const imgExt = getUrlExtension(imgUrl);
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], "plantImage." + imgExt, {
    type: blob.type,
  });

  return file;
};

const PlantForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageUrl = import.meta.env.VITE_APP_UPLOAD_IMG_URL;
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, SetLoading] = useState(false);
  // const [plant, setPlant] = useState();

  const reader = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });

  async function handleChangeUrl(fileList: FileList) {
    try {
      const urls = await Promise.all(Array.from(fileList).map(reader));
      console.log("urls", urls);
      setPreviewUrls(urls);
    } catch (err) {
      console.error(err);
    }
  }

  async function popluateCategories() {
    try {
      // const { data }: { data: dashResponse } =
      const { data } = await categoryService.getAllCategories();
      if (data?.data && data.data?.categories) {
        setCategories(data.data?.categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
    }
  }

  useEffect(() => {
    populatePlant(); //call before or doesnt set
    popluateCategories();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     // Revoke the object URLs to free up memory
  //     previewUrls.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [previewUrls]);

  async function populatePlant() {
    if (id === "new") return;
    if (!id) return; //return back to page
    try {
      // const { data }: { data: dashResponse } =
      const { data } = await plantsService.getPlant(id);
      if (data?.data && data.data?.plant) {
        const plant: PlantInterface = data.data.plant; //
        // setPlant(plant);
        const images = data.data.plant.images;
        const files: File[] = [];

        for (let i = 0; i < images.length || 0; i++) {
          //http://localhost:3500/images/images-1711633299887.jpg

          const file: File = await convertToFile(
            `${imageUrl}${images[i].filename}`
          );
          console.log("file", images[i], file);
          files.push(file);
        }

        if (files) {
          console.log("files", files);
          form.reset({
            name: plant?.name || "",
            categories: plant?.categories //categories always there
              ? plant.categories.map((cat) => cat._id)
              : [],
            description: plant?.description || "",
            longitude: plant?.location?.coordinates[0] || 0,
            latitude: plant?.location?.coordinates[1] || 0,
            files: files,
          });
          handleChangeUrl(files);
        }
      }
    } catch (error) {
      //setPlant({});
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categories: [],
      description: "",
      longitude: 0,
      latitude: 0,
      // files: {},
    },
  });

  // form.reset()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    SetLoading(true);
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    values.categories.forEach((catID, index) =>
      data.append(`categoryIds[${index}]`, catID)
    );

    const files = values.files;
    if (files) {
      for (let i = 0; i < files.length || 0; i++) {
        data.append("images", files[i]);
      }
    }

    data.append("latitude", String(values.latitude));
    data.append("longitude", String(values.longitude));

    try {
      // console.log("data", data);
      if (!id) {
        //nothing
      } else if (id === "new") {
        await plantsService.addPlant(data);
      } else {
        await plantsService.updatePlant(data, id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      SetLoading(false);
    }

    //categories
  }

  // console.log("id", id);
  // console.log("previewUrls", previewUrls);

  return (
    <div className="p-4">
      <div className=" space-y-2 ">
        <Button
          variant="outline"
          size="icon"
          className="my-2"
          onClick={() => navigate("/plants")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight ">
          {id == "new" ? "Add" : "Edit"} Plant
        </h2>
        <p className="text-muted-foreground">Please fill the below fields.</p>
      </div>
      <Separator className="my-2" />
      <div className="lg:grid lg:grid-cols-2">
        <div className="lg:col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plant Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        className="w-3/5 lg:w-80 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-80"
                        defaultValue={field.value}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            handleChangeUrl(files);
                          }
                          field.onChange(files);
                        }}
                        type="file"
                        multiple
                      />
                    </FormControl>
                    <FormDescription>
                      Please select images. Only .png, .jpg and .jpeg formats
                      allowed. Max 3 images allowed.{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description"
                        className="resize-none w-4/5 lg:w-80"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {categories?.length ? (
                // && plant
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>

                      {/* <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block  
                  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 w-80"
                        multiple
                        defaultValue={field.value}
                        // defaultValue={["66046324744fde43603e1d15"]}
                        onChange={(e) => {
                          const selectedOptions = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          );
                          field.onChange(selectedOptions);
                        }}
                      >
                        {categories.map((cat) => (
                          <option
                            value={cat._id}
                            key={cat._id}
                            className="p-1 "
                          >
                            {cat.name}
                          </option>
                        ))}
                      </select> */}
                      <MultiSelectDropdown
                        options={categories}
                        defaultValue={field.value}
                        onChange={field.onChange}
                      />
                      <FormDescription>
                        You can select more than one category.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}

              <div className="grid grid-cols-2 gap-2 w-80">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="longitude"
                            {...field}
                            type="number"
                            className="w-3/5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="latitude"
                            {...field}
                            type="number"
                            className="w-3/5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    {" "}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:col-span-1 mt-4">
          <Carousel
            opts={{
              align: "center",
            }}
            // className="w-full max-w-sm mt-2"
            className="w-80"
          >
            <CarouselContent>
              {previewUrls.length ? (
                previewUrls.map((url, index) => (
                  <CarouselItem
                    key={index}
                    //className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="w-60 h-40 border">
                      <img src={url} alt="" style={{ objectFit: "contain" }} />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="w-60 h-40 border flex justify-center items-center">
                    No Image
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PlantForm;
