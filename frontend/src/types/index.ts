export interface GridCell {
  row: number;
  col: number;
  value: string;
}

export interface ValidationError {
  row: number;
  col: number;
  user_value: string;
  correct_value: string;
}

export interface ValidationResponse {
  is_valid: boolean;
  errors: ValidationError[];
  message: string;
}

export interface PatternRule {
  group: string;
  start_number: number;
  details: string[];
}

export interface PatternInfo {
  title: string;
  description: string;
  rules: PatternRule[];
  note: string;
}

export interface HintResponse {
  row: number;
  col: number;
  value: string;
}

export interface SolutionResponse {
  solution: string[][];
}

export type GridType = string[][];
