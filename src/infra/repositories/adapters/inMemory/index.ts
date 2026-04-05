import { Repositories } from "@/src/domain/Repositories";

import { InMeMoryCategoryRepo } from "./InMeMoryCategoryRepo";
import { InMemoryCityRepo } from "./InMemoryCityRepo";

export const InMemoryRepository: Repositories = {
  city: new InMemoryCityRepo(),
  categories: new InMeMoryCategoryRepo(),
};
