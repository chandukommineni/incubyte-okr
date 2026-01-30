import type { KeyResult, OKR } from "../types/okr-types.ts";

interface OkrListProps {
  okrList: OKR[];
}
const OkrList = ({ okrList }: OkrListProps) => {
  return (
    <div>
      {okrList.map((okr) => (
        <div key={okr.id}>
          <h2>{okr.objective}</h2>
          <div>
            <KeyResults keyResults={okr.keyResults} />
          </div>
        </div>
      ))}
    </div>
  );
};

const KeyResults = ({ keyResults }: { keyResults: KeyResult[] }) => {
  return (
    <div>
      {keyResults.map((keyResult, index) => (
        <div key={index} className="flex gap-2 ">
          <input type={"checkbox"} />
          <p>
            {keyResult.description} : {keyResult.progress}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OkrList;
