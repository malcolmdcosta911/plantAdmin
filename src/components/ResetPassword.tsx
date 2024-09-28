import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import authService from "@/services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

type ResetPasswordProps = {
  setStep: (step: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ResetPassword = ({ setStep }: ResetPasswordProps) => {
  // ...
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await authService.resetPassword(
        values.newPassword,
        values.confirmPassword
      );
      if (data) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      //console.error(error)
      navigate("/login", { replace: true });
    }
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Reset Password
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          This page will expire in 10 mins.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-2">
              <FormLabel className="text-sm text-muted-foreground">
                Enter new Password
              </FormLabel>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Atleast 8 characters"
                        {...field}
                        className="my-input  w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 my-1" />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-2 mt-5">
              <FormLabel className="text-sm text-muted-foreground">
                Confirm Password
              </FormLabel>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Confirm Password"
                        {...field}
                        className="my-input  w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 my-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-2">
              <Button type="submit" className="w-full my-btn ">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
