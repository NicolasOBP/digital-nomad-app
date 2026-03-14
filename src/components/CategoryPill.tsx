import { Category, CategoryCode } from "../types";

import { IconName } from "./Icon";
import { Pill, PillProps } from "./Pill";

type CategoryPillProps = {
  category: Category;
} & Pick<PillProps, "active" | "onPress">;

export function CategoryPill({ category, ...pillProps }: CategoryPillProps) {
  const iconNameMap = categoryIconMap[category.code];

  return <Pill {...pillProps} iconName={iconNameMap} label={category.name} />;
}

const categoryIconMap: Record<CategoryCode, IconName> = {
  ADVENTURE: "Adventure",
  BEACH: "Beach",
  CULTURE: "Culture",
  FAVORITE: "Star",
  GASTRONOMY: "Gastronomy",
  HISTORY: "History",
  LUXURY: "Luxury",
  NATURE: "Nature",
  SHOPPING: "Shopping",
  URBAN: "Urban",
};
