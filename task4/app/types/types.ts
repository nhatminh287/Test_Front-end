export interface Query {
  type: '1' | '2'; // Loại truy vấn: '1' hoặc '2'
  range: [number, number]; // Khoảng [l, r]
}

export interface ApiResponse {
  token: string;
  data: number[]; // Mảng số nguyên không âm
  query: Query[]; // Mảng các truy vấn
}
