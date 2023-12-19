import React from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Label from "./Label";
type Props = { nutrition: any; healthScore: number };
const WidgetNutritional = ({ nutrition, healthScore }: Props) => {
  console.log(nutrition);

  const quickViewNutrition = (label: string) => {
    return (
      nutrition.nutrients.filter((nutrient: any) => nutrient.name === label)[0]
        .amount +
      " " +
      label
    );
  };

  return (
    <div className="w-full">
      <Label>Nutritional Information</Label>
      <h2>Quick view</h2>
      <div className="flex mb-5">
        {["Calories", "Protein", "Fat", "Carbohydrates"].map((item, index) => (
          <div
            key={index}
            className="p-2 mr-2 border border-solid font-semibold"
          >
            {quickViewNutrition(item)}
          </div>
        ))}
        <div className="p-2 mr-2 border border-solid font-semibold">
          {healthScore}% Health Score
        </div>
      </div>
      <h2>Get Enough Of These</h2>
      <div className="relative h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={nutrition.nutrients}
            margin={{
              top: 5,
              right: 50,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              scale="point"
              type="category"
              padding={{ top: 10, bottom: 10 }}
              className="text-xs"
            />
            <YAxis
              dataKey="amount"
              scale="point"
              type="category"
              padding={{ top: 10, bottom: 10 }}
              className="text-xs"
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="percentOfDailyNeeds"
              name="Percent of daily needs (%)"
              fill="#8884d8"
              unit="%"
            >
              <LabelList
                dataKey="percentOfDailyNeeds"
                position="right"
                className="text-xs"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WidgetNutritional;
