import { ComponentPropsWithoutRef, ReactNode } from "react";
import { useChecked } from "./useChecked";

type Props<Data> = {
  data: Data[];
  // The data prop is the data that drives the items in the list
  id: keyof Data;
  // The id prop is the property’s name in each data item that uniquely identifies the item
  primary: keyof Data;
  // The primary prop is the property’s name in each data item that contains the main text to render in each item
  secondary: keyof Data;
  // The secondary prop is the property’s name in each data item that includes the supplementary text to render in each item
  renderItem?: (item: Data) => ReactNode;
  // renderItem? is a function that takes in the data item and returns what needs rendering
} & ComponentPropsWithoutRef<"ul">;
// This type allows us to reference the props of an HTML element such as ul. It is a generic type
// that takes the HTML element name as a generic parameter.

export function Checklist<Data>({
  data,
  id,
  primary,
  secondary,
  renderItem,
  ...ulProps
}: Props<Data>) {
  const { checkedIds, handleCheckChange } = useChecked();

  return (
    <ul className="bg-gray-300 rounded p-10" {...ulProps}>
      {data.map((item) => {
        if (renderItem) {
          return renderItem(item);
        }
        const idValue = item[id] as unknown;
        if (typeof idValue !== "string" && typeof idValue !== "number") {
          return null;
        }
        const primaryText = item[primary] as unknown;
        if (typeof primaryText !== "string") {
          return null;
        }
        const secondaryText = item[secondary] as unknown;
        return (
          <li
            key={idValue}
            className="bg-white p-6 shadow rounded mb-4 last:mb-0"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={checkedIds.includes(idValue)}
                onChange={handleCheckChange(idValue)}
              />
              <div className="ml-2">
                <div className="text-xl text-gray-800 pb-1">{primaryText}</div>
                {typeof secondaryText === "string" && (
                  <div className="text-sm text-gray-500">{secondaryText}</div>
                )}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
