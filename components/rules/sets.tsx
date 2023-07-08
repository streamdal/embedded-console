import { MonitorIcon } from "../icons/streamdal.tsx";
import { titleCase } from "../../lib/utils.ts";
import { Total } from "./metrics/total.tsx";

export const TH = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <th
    className={`text-xs-[12px] font-medium leading-[18px] text-left pb-3 ${className}`}
  >
    {children}
  </th>
);

export const TD = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <td
    className={`align-top text-xs-[14px] font-medium leading-[18px] text-left pb-5 ${className}`}
  >
    {children}
  </td>
);

export const humanMode = (mode?: string) =>
  mode ? titleCase(mode.substring(10)) : "";

export type RuleSet = { [key in string]: { id: string; name: string } };

export interface RuleSetType {
  ruleSet: RuleSet;
}

export const RuleSets = ({ data }: { data: RuleSetType }) => {
  return (
    <div className="max-w-[1440px]">
      <div className="flex flex-row justify-between align-middle pb-4 mb-4 font-bold text-lg leading-5 border-b">
        <div className="flex flex-row justify-start">
          <MonitorIcon className="mr-2 w-[14px]" />
          <span className="text-web">Rule sets</span>
        </div>
      </div>
      <table className="table-auto border-collapse w-full text-sm">
        <thead>
          <tr className="border-spacing-6">
            <TH>Name</TH>
            <TH>Mode</TH>
            <TH>Data Source</TH>
            <TH>Key</TH>
            <TH className="text-center">Version</TH>
            <TH>Metrics</TH>
            <TH></TH>
          </tr>
        </thead>
        <tbody>
          {data?.ruleSets &&
            Object.values(data.ruleSets)?.map((r: any, i: number) => (
              <tr key={`ruleset-table-${i}`}>
                <TD>
                  <a
                    className="hover:underline underline-offset-2 font-bold"
                    href={`/ruleset?id=${r.id}`}
                  >
                    {r.name}
                  </a>
                </TD>
                <TD>{humanMode(r.mode)}</TD>
                <TD>{r.data_source}</TD>
                <TD>{r.key}</TD>
                <TD className="text-center">{r.version}</TD>
                <TD className="text-left">
                  <div className="flex flex-col mr-4">
                    <div>
                      Data:{" "}
                      <Total
                        metrics={data?.metrics}
                        id={r.id}
                        kind="streamdal_snitch_rule"
                        type="bytes"
                      />
                    </div>
                    <div>
                      Events:{" "}
                      <Total
                        metrics={data?.metrics}
                        id={r.id}
                        kind="streamdal_snitch_rule"
                        type="count"
                      />
                    </div>
                    <div>
                      Failed Data:{" "}
                      <Total
                        metrics={data?.metrics}
                        id={r.id}
                        kind="streamdal_snitch_failure_trigger"
                        type="bytes"
                      />
                    </div>
                    <div>
                      Failed Events:{" "}
                      <Total
                        metrics={data?.metrics}
                        id={r.id}
                        kind="streamdal_snitch_failure_trigger"
                        type="count"
                      />
                    </div>
                    <div className="cursor-pointer">
                      <a
                        className="hover:underline underline-offset-2 font-bold"
                        href={`/ruleset?id=${r.id}`}
                      >
                        more&gt;
                      </a>
                    </div>
                  </div>
                </TD>
                <TD>
                  {/*<RuleSetMenu id={r.id} />*/}
                  {/*<NewRuleSetMenu id={r.id} />*/}
                </TD>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full mt-4 flex justify-end">
        <a href="/ruleset/edit">
          <input
            type="button"
            className="flex justify-center btn-heimdal"
            value="Add Rule Set"
          />
        </a>
      </div>
    </div>
  );
};