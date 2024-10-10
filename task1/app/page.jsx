"use client"
import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";

const ExcelUploader = () => {
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [total, setTotal] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false); // Trạng thái để kiểm tra file đã tải lên
  const toast = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        defval: "",
        range: 7,
      }); // Bắt đầu từ hàng thứ 8
      setData(jsonData);
      setFileUploaded(true); // Đánh dấu rằng tệp đã được tải lên
    };

    reader.readAsArrayBuffer(file); // Đọc file
  };

  const calculateTotal = () => {
    if (!fileUploaded) {
      toast({
        title: "Thông báo",
        description: "Vui lòng chọn tệp Excel trước khi tính tổng!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!startTime || !endTime) {
      toast({
        title: "Thông báo",
        description: "Vui lòng nhập giờ bắt đầu và giờ kết thúc!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (isNaN(start) || isNaN(end)) {
      toast({
        title: "Thông báo",
        description: "Giờ nhập không hợp lệ!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const filteredData = data.filter((transaction) => {
      const transactionTime = new Date(`1970-01-01T${transaction["Giờ"]}`);
      return transactionTime >= start && transactionTime <= end;
    });

    const totalAmount = filteredData.reduce((sum, transaction) => {
      let amount = transaction["Thành tiền (VNĐ)"];

      if (typeof amount === "string") {
        amount = amount.replace(/,/g, "");
        amount = parseFloat(amount);
      }

      if (isNaN(amount)) return sum;

      return sum + amount;
    }, 0);

    setTotal(totalAmount);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[90vh] p-8 pb-20 gap-16 sm:p-10 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Box
          p={5}
          maxW="600px"
          mx="auto"
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading mb={4}>Upload và Tính Tổng Thành Tiền</Heading>

          <Input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            mb={4}
            sx={{ cursor: "pointer" }}
          />

          <FormControl mb={4}>
            <FormLabel>Thời gian bắt đầu:</FormLabel>
            <Input
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              sx={{ cursor: "pointer" }}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Thời gian kết thúc:</FormLabel>
            <Input
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              sx={{ cursor: "pointer" }}
            />
          </FormControl>

          <style jsx global>{`
            input[type="time"]::-webkit-calendar-picker-indicator {
              cursor: pointer;
            }
          `}</style>

          <Button colorScheme="blue" onClick={calculateTotal}>
            Tính Tổng Tiền
          </Button>

          <Text fontSize="lg" mt={4}>
            Tổng tiền: {total.toLocaleString()} VNĐ
          </Text>
        </Box>
      </main>
    </div>
  );
};

export default ExcelUploader;
