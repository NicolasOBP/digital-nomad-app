import { Repositories } from "@/src/domain/Repositories";

import { InMeMoryCategoryRepo } from "./InMeMoryCategoryRepo";
import { InMemoryCityRepo } from "./InMemoryCityRepo";

export const InMemoryRepositories: Repositories = {
  city: new InMemoryCityRepo(),
  categories: new InMeMoryCategoryRepo(),
};
