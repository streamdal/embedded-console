import { Layout } from "../../../../../../../../components/layout.tsx";
import OpModal from "../../../../../../../../islands/opModal.tsx";
import { Handlers, PageProps } from "$fresh/src/server/types.ts";
import {
  getServiceMap,
  getServiceNodes,
  ServiceMapType,
  ServiceNodes,
} from "../../../../../../../../lib/fetch.ts";
import { SuccessType } from "../../../../../../../_middleware.ts";
import ServiceMap from "../../../../../../../../islands/serviceMap.tsx";

export type ServicePipelines = {
  serviceNodes: ServiceNodes;
  serviceMap: ServiceMapType;
  success?: SuccessType;
};

export const handler: Handlers<ServicePipelines> = {
  async GET(_req, ctx) {
    return ctx.render({
      serviceNodes: await getServiceNodes(),
      serviceMap: await getServiceMap(),
    });
  },
};

export default function FlowRoute(
  props: PageProps<
    ServicePipelines
  >,
) {
  return (
    <Layout>
      <OpModal
        modalOpen={true}
        params={props.params as any}
        serviceMap={props.data.serviceMap}
        success={props.data.success}
      />
      <ServiceMap
        nodesData={props.data.serviceNodes.nodes}
        edgesData={props.data.serviceNodes.edges}
      />
    </Layout>
  );
}
