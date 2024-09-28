import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import authService from "@/services/authService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  pin: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .max(6, {
      message: "Your one-time password must be 6 characters.",
    }),
});

type VerifyOtpProps = {
  setStep: (step: number) => void;
  time: number;
};

const VerifyOtp = ({ setStep, time }: VerifyOtpProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    try {
      const { data } = await authService.verifyOtp(values.pin);
      if (data) {
        setStep(2);
      }
    } catch (error) {
      //console.error(error);
    }
  }

  // Calculate minutes and seconds from the remaining time
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time / 1000) % 60);

  // Format the time to display in MM:SS format
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>
          <p className="text-2xl font-semibold tracking-tight">Verification</p>
          <p className="text-sm text-muted-foreground ">
            Enter Verification Code
          </p>
        </CardTitle>
        <CardDescription>
          {time > 0 ? (
            <div className="my-1">
              <p className="text-sm">
                Your otp will expire in {formattedTime} mins
              </p>
            </div>
          ) : (
            <p className="text-sm">Your otp has expired</p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="my-2">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="">
                        <InputOTP
                          disabled={time > 0 ? false : true}
                          maxLength={6}
                          {...field}
                          containerClassName=" justify-center   "
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="my-2"></div>

              {time > 0 ? (
                <Button className="w-full my-btn " type="submit">
                  Send
                </Button>
              ) : (
                <Button
                  className="w-full my-btn "
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyOtp;
