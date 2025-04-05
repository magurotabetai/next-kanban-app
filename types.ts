import { List, Card } from "@/lib/db/schema";

export type { List, Card };

export type ListWithCards = List & {
  cards: Card[];
};

export type CardWithList = Card & {
  list: List;
};
