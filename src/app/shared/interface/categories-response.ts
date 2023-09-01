export interface CategoriesResponse {
  trivia_categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}

export interface payloadQuestions {
  quant: number,
  category: number,
  dificult: string
}
