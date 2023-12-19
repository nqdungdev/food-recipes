import React from "react";
import Label from "./Label";

type Props = {
  analyzedInstructions: any;
  sourceUrl: string;
  sourceName: string;
};

const Instructions = ({
  analyzedInstructions,
  sourceUrl,
  sourceName,
}: Props) => {
  return (
    <div>
      <Label>Instructions</Label>
      <div>
        {analyzedInstructions[0]?.steps.map(
          (instruction: any, index: number) => (
            <div key={index}>
              <p>
                Step {instruction.number}: {instruction.step}
              </p>
            </div>
          )
        )}

        <div className="mt-2">
          Read the detailed instructions on{" "}
          <a className="text-blue-500" href={sourceUrl}>
            {sourceName}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
