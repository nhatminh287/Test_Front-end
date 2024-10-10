"use client";
import React, { useState, useEffect } from "react";
import ResultList from "./ResultList";
import { ApiResponse, Query } from "../types/types";
import { computePrefixSums } from "../utils/prefixSums"; // Import hàm computePrefixSums

const MyComponent: React.FC = () => {
  const [data, setData] = useState<number[]>([]); // mảng data input get từ api
  const [queries, setQueries] = useState<Query[]>([]); // mảng queries get từ api
  const [token, setToken] = useState<string>("");
  const [results, setResults] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processData = async () => {
      try {
        const response = await fetch("/api/proxyInput"); // Gọi API proxy
        const result: ApiResponse = await response.json();
        setData(result.data);
        setQueries(result.query);
        setToken(result.token);

        // Sử dụng hàm computePrefixSums để tính toán prefix sum và prefix even-odd
        const { prefixSum, prefixEvenOdd } = computePrefixSums(result.data);

        // Xử lý truy vấn
        const queryResults = handleQueries(
          result.query,
          prefixSum,
          prefixEvenOdd
        );

        setResults(queryResults);

        // Gửi kết quả thông qua proxyOutput
        await fetch("/api/proxyOutput", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: result.token,
            results: queryResults,
          }),
        });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ml-3 mt-2">
      <h1>Token: {token}</h1>
      <ResultList results={results} />
    </div>
  );
};

const handleQueries = (
  queries: Query[],
  prefixSum: number[],
  prefixEvenOdd: number[]
) => {
  return queries.map((query) => {
    const [l, r] = query.range;

    if (query.type === "1") {
      // Tính tổng trong khoảng
      return prefixSum[r + 1] - prefixSum[l];
    } else if (query.type === "2") {
      // Tính tổng chẵn - lẻ
      if (l % 2 === 0) // nếu l chẵn kết quả trùng với công thức xây dựng
        return prefixEvenOdd[r + 1] - prefixEvenOdd[l];
      else // nếu l lẻ kết quả bằng kết quả của công thức * (-1)
        return -(prefixEvenOdd[r + 1] - prefixEvenOdd[l]);
    }

    return 0; // Giá trị mặc định nếu không khớp
  });
};

export default MyComponent;
