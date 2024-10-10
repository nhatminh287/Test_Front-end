-- Trạm xăng
CREATE TABLE GasStation (
    station_id INT IDENTITY(1,1) PRIMARY KEY,
    station_name NVARCHAR(100) NOT NULL,
    location NVARCHAR(255) NOT NULL,
    contact_number NVARCHAR(15)
);

-- Hàng hóa
CREATE TABLE Product (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name NVARCHAR(100) NOT NULL,
    product_type NVARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Trụ bơm
CREATE TABLE Pump (
    pump_id INT IDENTITY(1,1) PRIMARY KEY,
    station_id INT REFERENCES GasStation(station_id),
    pump_number NVARCHAR(10) NOT NULL,
    product_id INT REFERENCES Product(product_id)
);

-- Giao dịch
CREATE TABLE FuelTransaction (
    transaction_id INT IDENTITY(1,1) PRIMARY KEY,
    station_id INT REFERENCES GasStation(station_id),
    pump_id INT REFERENCES Pump(pump_id),
    product_id INT REFERENCES Product(product_id),
    transaction_date DATETIME NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    total_value DECIMAL(10, 2) NOT NULL
);

--Chỉ mục cho trường location để tăng tốc độ tìm kiếm các trạm xăng theo vị trí.
CREATE INDEX IDX_GasStation_Location ON GasStation(location);

-- Chỉ mục cho trường product_name để nhanh chóng tìm kiếm sản phẩm theo tên.
CREATE INDEX IDX_Product_Name ON Product(product_name);

-- Chỉ mục cho trường station_id để tối ưu hóa truy vấn liên quan đến các trụ bơm của một trạm xăng cụ thể.
CREATE INDEX IDX_Pump_StationID ON Pump(station_id);

-- Chỉ mục cho trường product_id để tối ưu hóa truy vấn tìm kiếm trụ bơm theo sản phẩm.
CREATE INDEX IDX_Pump_ProductID ON Pump(product_id);

-- Chỉ mục cho trường transaction_date để tối ưu hóa các truy vấn tìm kiếm giao dịch theo ngày.
CREATE INDEX IDX_FuelTransaction_Date ON FuelTransaction(transaction_date);

--Chỉ mục cho trường station_id để nhanh chóng tìm kiếm giao dịch theo trạm xăng.
CREATE INDEX IDX_FuelTransaction_StationID ON FuelTransaction(station_id);

-- Chỉ mục cho trường pump_id để tối ưu hóa truy vấn giao dịch theo trụ bơm.
CREATE INDEX IDX_FuelTransaction_PumpID ON FuelTransaction(pump_id);


