import { InferSelectModel } from "drizzle-orm";
import { cards, lists } from "@/lib/db/schema";

export type List = InferSelectModel<typeof lists>;
export type Card = InferSelectModel<typeof cards>;

export type ListWithCards = List & {
  cards: Card[];
};

export type CardWithList = Card & {
  list: List;
};
