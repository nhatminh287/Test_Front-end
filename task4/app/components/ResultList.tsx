import React from "react";

interface ResultListProps {
  results: number[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>
          Kết quả truy vấn {index + 1}: {result}
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
