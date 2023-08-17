import { signal } from "@preact/signals";
import { Audience } from "snitch-protos/protos/common.ts";
import { Pipeline } from "snitch-protos/protos/pipeline.ts";

export type OpModalType = { audience: Audience; attachedPipeline?: Pipeline };
export const opModal = signal<OpModalType | null>(null);