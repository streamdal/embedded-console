import { Edit, Info, Silence } from "../icons/crud.tsx";
import { removeWhitespace } from "../../lib/utils.ts";
import { opModal } from "./opModalSignal.ts";
import { Audience } from "snitch-protos/protos/common.ts";
import { Pipeline } from "snitch-protos/protos/pipeline.ts";
import { NodeData } from "./customNodes.tsx";
import IconDots from "tabler-icons/tsx/dots.tsx";
import IconPlayerPause from "tabler-icons/tsx/player-pause.tsx";
import IconLink from "tabler-icons/tsx/link.tsx";
import { Tooltip } from "../tooltip/tooltip.tsx";

export const NodeMenu = ({ audience, attachedPipeline }: {
  audience: Audience;
  attachedPipeline: Pipeline;
}) => {
  const id = removeWhitespace(audience.operationName);
  return (
    <div className={"rounded bg-purple-50 ml-4"}>
      <div
        id={`${id}-button}`}
        data-dropdown-toggle={`${id}-menu`}
        data-dropdown-placement="top"
        type="button"
        class="cursor-pointer"
      >
        <IconDots class="w-6 h-6 text-gray-400" aria-hidden="true" />
      </div>
      <div
        id={`${id}-menu`}
        className={`z-[1002] left-[-100px] top=[-10px] bg-white divide-y divide-gray-100 rounded-lg shadow w-[200px] hidden`}
      >
        <ul
          class="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownButton"
        >
          <li
            className="flex w-full flex-start items-center py-2 px-2 hover:bg-sunset text-sm cursor-pointer"
            onClick={() =>
              opModal.value = {
                audience,
                attachedPipeline,
              }}
          >
            <Info className="w-4 text-web mr-2" />
            More Information
          </li>
          <button class="w-full">
            {attachedPipeline
              ? (
                <li className="group flex w-full flex-start items-center py-2 px-2 text-eyelid hover:text-white hover:bg-eyelid text-sm">
                  <IconPlayerPause class="w-4 mr-2 text-eyelid group-hover:text-white fill-current" />
                  Pause Pipeline
                </li>
              )
              : (
                <li
                  className="group flex w-full flex-start items-center py-2 px-2 hover:bg-sunset text-sm"
                  onClick={() =>
                    opModal.value = {
                      audience,
                      attachedPipeline,
                    }}
                >
                  <IconLink class="w-4 mr-2 text-web" />
                  Attach Pipeline
                </li>
              )}
          </button>
          {attachedPipeline
            ? (
              <a href={`/pipelines/${attachedPipeline}`}>
                <li className="flex w-full flex-start items-center px-2 py-2 hover:bg-sunset text-sm">
                  <Edit className="text-red mr-2" />
                  Edit Rules
                </li>
              </a>
            )
            : (
              <>
                <li
                  data-tooltip-target={`${id}-rule-warning`}
                  className="flex w-full flex-start items-center px-2 py-2 hover:bg-sunset text-sm cursor-not-allowed"
                >
                  <Edit className="text-red mr-2" />
                  Edit Rules
                </li>
                <Tooltip
                  targetId={`${id}-rule-warning`}
                  message="You must attach a pipeline first"
                />
              </>
            )}

          <li className="flex w-full flex-start items-center py-2 px-2 hover:bg-sunset text-sm cursor-not-allowed">
            <Silence className="text-web mr-2" />
            Silence Notifications
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ServiceNodeMenu = ({ data }: { data: NodeData }) => {
  return (
    <div className={"rounded bg-purple-50 ml-4"}>
      <div
        id={`${data.audience.serviceName}-button`}
        data-dropdown-toggle={`${data.audience.serviceName}-menu`}
        data-dropdown-placement="top"
        type="button"
        class="cursor-pointer"
      >
        <IconDots class="w-6 h-6 text-gray-400" aria-hidden="true" />
      </div>
      <div
        id={`${data.audience.serviceName}-menu`}
        class={`z-[1002] left-[-100px] top=[-10px] bg-white divide-y divide-gray-100 rounded-lg shadow w-[200px] hidden`}
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownButton"
        >
          <a href="/pipelines">
            <li className="flex w-full flex-start items-center py-2 px-2 hover:bg-sunset text-sm">
              <Edit className="text-red mr-2" />
              Edit Pipelines
            </li>
          </a>
          <li className="flex w-full flex-start items-center py-2 px-2 hover:bg-sunset text-sm cursor-not-allowed">
            <Silence className="text-web mr-2" />
            Silence Notifications
          </li>
        </ul>
      </div>
    </div>
  );
};
