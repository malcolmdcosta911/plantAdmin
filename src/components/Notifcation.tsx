// import { toast } from "react-toastify";
import { socket } from "../services/socket";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

const Notifcation = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);
  // const [plantId, setPlantId] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onUserPlantAdd(value) {
      console.log("onUserPlantAdd", value);
      // toast.info(value[0].plantId);
      toast({
        title: "User added new plant",
        description: "click to view plant",
        action: (
          <ToastAction
            altText="View plant"
            onClick={() => {
              // console.log("yes");
              //redirect to not found if no id
              navigate(`/plants/${value[0].plantId}`);
            }}
          >
            View Plant details
          </ToastAction>
        ),
      });
      //setFooEvents((previous) => [...previous, value]);
      // setPlantId(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("plantAdded", onUserPlantAdd);
    // either by directly modifying the `auth` attribute
    // socket.on("connect_error", (err) => {
    //   //   socket.auth.token = "abcd";
    //   //   socket.connect();
    //   console.log(err);
    // });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("plantAdded", onUserPlantAdd);
    };
  }, [navigate, toast]);

  console.log("isConnected", isConnected);

  return (
    <>
      {" "}
      {/* only show this toast on sign in */}
      {/* only connect when jwt present */}
      {/* <AuthenticatedRoute> */}
      <Toaster />
      {/* </AuthenticatedRoute> */}
    </>
  );
};

export default Notifcation;
