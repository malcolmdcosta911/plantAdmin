import ForgotPassword from "@/components/ForgotPassword";
import ResetPassword from "@/components/ResetPassword";
import VerifyOtp from "@/components/VerifyOtp";
import { useEffect, useState } from "react";

function ForgotPasswordPage() {
  const [step, setStep] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(2 * 60 * 1000);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time < 0) {
            clearInterval(interval);
            setIsActive(false); // Stop the timer
            return 0; // Keep the time at 0
          }
          return time - 1000;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  // const handleReset = () => {
  //   setIsActive(false);
  //   setTime(2 * 60 * 1000);
  // };

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
          {step === 0 ? (
            <ForgotPassword setStep={setStep} startTimer={handleStart} />
          ) : step === 1 ? (
            <VerifyOtp setStep={setStep} time={time} />
          ) : step === 2 ? (
            <ResetPassword setStep={setStep} />
          ) : null}
        </div>
        <div className="absolute top-2 left-2 p-4">
          <p className="text-lg text-white font-semibold">
            Plant Org Inc Admin
          </p>
        </div>
      </section>
    </>
  );
}

export default ForgotPasswordPage;

//eneter mobile no
