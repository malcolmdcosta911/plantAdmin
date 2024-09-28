import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import authService from "../services/authService";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
// import loginImage from "./login.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password  is required",
  }),
});

function LoginPage() {
  // ...

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await authService.login(values.email, values.password);
      window.location.href = "/";
    } catch (error) {
      //console.error(error)
    }
  }

  return (
    <>
      <section>
        <div
          className="h-svh flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${"/leaves.jpg"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Card className="w-80">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Login into your account
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Enter your details to login
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="my-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="Email"
                              {...field}
                              className="h-9   my-input w-full"
                              //type="email"
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-600 my-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-2 ">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              {...field}
                              className="h-9  my-input w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-600 my-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="my-2">
                    <Button
                      type="submit" //                      bg-primary text-primary-foreground shadow hover:bg-primary/90
                      className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  h-9 px-4 py-2 
                       bg-foreground hover:bg-foreground/90 text-white w-full "
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Link
                className="text-sm text-muted-foreground underline"
                to="/forgot"
              >
                Forgot password?
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="absolute top-2 left-2 p-4">
          <p className="text-lg text-white font-semibold">
            Plant Org Inc Admin
          </p>
        </div>
        <div className="absolute bottom-5 right-2 p-4">
          <p className="text-xl text-white font-semibold">
            “To plant a garden is to believe in tomorrow.”
          </p>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
