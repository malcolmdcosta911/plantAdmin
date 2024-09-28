import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import authService from "@/services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  mobileNo: z.string().min(10, {
    message: "Mobile No must be at least 10 digits.",
  }),
});

type ForgotPasswordProps = {
  setStep: (step: number) => void;
  startTimer: () => void;
};

const ForgotPassword = ({ setStep, startTimer }: ForgotPasswordProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await authService.verifyPhone(values.mobileNo);
      if (data) {
        setStep(1);
        startTimer();
      }
    } catch (error) {
      // console.error(error)
    }
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your Mobile No
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-2">
              <FormField
                control={form.control}
                name="mobileNo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Mobile No"
                        {...field}
                        className="my-input my-input--number w-full"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 my-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-2">
              <Button type="submit" className=" my-btn  w-full">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link to="/login" className="text-sm text-muted-foreground underline">
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
