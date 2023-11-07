import { LayoutContext } from "$fresh/server.ts";
import ServiceMapComponent from "../islands/serviceMap.tsx";
import { NavBar } from "../islands/nav.tsx";
import { ReactFlowProvider } from "reactflow";
import Operation from "../islands/drawer/operation.tsx";
import { serviceSignal } from "../components/serviceMap/serviceSignal.ts";
import { initAllServices } from "../lib/fetch.ts";
import { GRPC_TOKEN } from "../lib/configs.ts";
import { CustomError } from "../components/error/custom.tsx";
import { Partial } from "$fresh/runtime.ts";
import { InfoDrawer } from "../islands/drawer/infoDrawer.tsx";

const tokenError = () => (
  <CustomError
    children={
      <span>
        You must supply STREAMDAL_CONSOLE_GRPC_AUTH_TOKEN as an environment
        variable or in a .env file. See{" "}
        <a
          class="text-underline "
          href="https://github.com/streamdal/console/blob/master/example.env."
        >
          example
        </a>.
      </span>
    }
  />
);

export default async function Layout(req: Request, ctx: LayoutContext) {
  if (!GRPC_TOKEN) {
    return (
      <>
        <NavBar />
        {tokenError()}
      </>
    );
  }

  await initAllServices();
  const success = ctx.data?.success;

  return (
    <>
      <NavBar />
      {!req.url.includes("/email") && (
        <InfoDrawer serviceMap={serviceSignal.value} />
      )}
      <div className="flex flex-col w-screen text-web">
        <Partial name="main-content">
          <ctx.Component />
        </Partial>
        <ReactFlowProvider>
          <ServiceMapComponent
            initNodes={serviceSignal.value
              ? Array.from(serviceSignal.value.nodesMap.values())
              : []}
            initEdges={serviceSignal.value
              ? Array.from(serviceSignal.value.edgesMap.values())
              : []}
            success={success}
          />
        </ReactFlowProvider>

        <div class="absolute bottom-0 left-0 text-web ml-2 mb-1 flex justify-center items-center text-xs">
          <a className={"mr-2"} href={"https://github.com/streamdal/streamdal"}>
            <img src={"/images/github-logo.svg"} />
          </a>
          {await Deno.readTextFile("VERSION")}
        </div>
      </div>
    </>
  );
}
