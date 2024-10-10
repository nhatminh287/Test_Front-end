"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";

const TransactionForm = () => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      datetime: "",
      quantity: "",
      pump: "",
      revenue: "",
      unitPrice: "",
    },
    validationSchema: Yup.object({
      datetime: Yup.date().required("Thời gian không được để trống"),
      quantity: Yup.number()
        .required("Số lượng không được để trống")
        .positive("Số lượng phải lớn hơn 0")
        .typeError("Số lượng phải là một số"),
      pump: Yup.string().required("Trụ không được để trống"),
      revenue: Yup.number()
        .required("Doanh thu không được để trống")
        .positive("Doanh thu phải lớn hơn 0"),
      unitPrice: Yup.number()
        .required("Đơn giá không được để trống")
        .positive("Đơn giá phải lớn hơn 0"),
    }),
    onSubmit: (values) => {
      // Xử lý cập nhật giao dịch ở đây
      console.log("Dữ liệu giao dịch:", values);
      toast({
        title: "Cập nhật thành công",
        description: "Giao dịch đã được cập nhật!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      formik.resetForm(); // Reset form sau khi cập nhật thành công
    },
  });

  return (
    <Box
      p={5}
      maxW="600px"
      mx="auto"
      borderWidth={1}
      borderColor="gray.600"
      borderRadius="lg"
      className="mt-10"
    >
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Nhập giao dịch
      </Text>{" "}
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          mb={4}
          isInvalid={formik.touched.datetime && Boolean(formik.errors.datetime)}
        >
          <FormLabel>Thời gian giao dịch:</FormLabel>
          <Input
            type="datetime-local"
            name="datetime"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ cursor: "pointer" }}
          />
          <Text color="red.500">
            {formik.touched.datetime && formik.errors.datetime}
          </Text>
        </FormControl>

        <style jsx global>{`
          input[type="datetime-local"]::-webkit-calendar-picker-indicator {
            cursor: pointer; /* Thêm con trỏ pointer cho biểu tượng lịch */
          }
        `}</style>

        <FormControl
          mb={4}
          isInvalid={formik.touched.quantity && Boolean(formik.errors.quantity)}
        >
          <FormLabel>Số lượng (lít):</FormLabel>
          <Input
            type="number"
            name="quantity"
            step="0.01" // Cho phép nhập số thập phân
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Text color="red.500">
            {formik.touched.quantity && formik.errors.quantity}
          </Text>
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={formik.touched.pump && Boolean(formik.errors.pump)}
        >
          <FormLabel>Trụ:</FormLabel>
          <Select
            name="pump"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ cursor: "pointer" }}
          >
            <option value="">Chọn trụ</option>
            <option value="1">Trụ 1</option>
            <option value="2">Trụ 2</option>
            <option value="3">Trụ 3</option>
          </Select>
          <Text color="red.500">
            {formik.touched.pump && formik.errors.pump}
          </Text>
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={formik.touched.revenue && Boolean(formik.errors.revenue)}
        >
          <FormLabel>Doanh thu (VNĐ):</FormLabel>
          <Input
            type="number"
            name="revenue"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Text color="red.500">
            {formik.touched.revenue && formik.errors.revenue}
          </Text>
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={
            formik.touched.unitPrice && Boolean(formik.errors.unitPrice)
          }
        >
          <FormLabel>Đơn giá (VNĐ):</FormLabel>
          <Input
            type="number"
            name="unitPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Text color="red.500">
            {formik.touched.unitPrice && formik.errors.unitPrice}
          </Text>
        </FormControl>

        <style jsx global>{`
          input[type="time"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
          }
        `}</style>

        <Button colorScheme="blue" type="submit" ml="auto" display="block">
          Cập nhật
        </Button>
      </form>
    </Box>
  );

};

export default TransactionForm;
