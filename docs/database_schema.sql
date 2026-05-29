-- ============================================================
--  PharmaCare - Complete SQL Server Database Schema
--  Run this script to create the database from scratch
-- ============================================================

USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'PharmacyDB')
    CREATE DATABASE PharmacyDB;
GO

USE PharmacyDB;
GO

-- ─── Roles ───────────────────────────────────────────────────────────────────
CREATE TABLE Roles (
    Id          INT           IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(50)  NOT NULL UNIQUE,
    Description NVARCHAR(200) NULL
);

-- ─── Users ───────────────────────────────────────────────────────────────────
CREATE TABLE Users (
    Id                     INT            IDENTITY(1,1) PRIMARY KEY,
    FirstName              NVARCHAR(100)  NOT NULL,
    LastName               NVARCHAR(100)  NOT NULL,
    Email                  NVARCHAR(200)  NOT NULL UNIQUE,
    PasswordHash           NVARCHAR(MAX)  NOT NULL,
    PhoneNumber            NVARCHAR(20)   NULL,
    ProfileImage           NVARCHAR(500)  NULL,
    IsActive               BIT            NOT NULL DEFAULT 1,
    IsEmailVerified        BIT            NOT NULL DEFAULT 0,
    EmailVerificationToken NVARCHAR(MAX)  NULL,
    PasswordResetToken     NVARCHAR(MAX)  NULL,
    PasswordResetExpiry    DATETIME2      NULL,
    CreatedAt              DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt              DATETIME2      NULL
);

CREATE INDEX IX_Users_Email ON Users(Email);

-- ─── UserRoles ────────────────────────────────────────────────────────────────
CREATE TABLE UserRoles (
    UserId     INT       NOT NULL REFERENCES Users(Id)  ON DELETE CASCADE,
    RoleId     INT       NOT NULL REFERENCES Roles(Id)  ON DELETE CASCADE,
    AssignedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    PRIMARY KEY (UserId, RoleId)
);

-- ─── Categories ───────────────────────────────────────────────────────────────
CREATE TABLE Categories (
    Id          INT            IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(100)  NOT NULL,
    Slug        NVARCHAR(100)  NOT NULL UNIQUE,
    Description NVARCHAR(500)  NULL,
    ImageUrl    NVARCHAR(500)  NULL,
    ParentId    INT            NULL REFERENCES Categories(Id),
    SortOrder   INT            NOT NULL DEFAULT 0,
    IsActive    BIT            NOT NULL DEFAULT 1,
    CreatedAt   DATETIME2      NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_Categories_Slug     ON Categories(Slug);
CREATE INDEX IX_Categories_ParentId ON Categories(ParentId);

-- ─── Products ─────────────────────────────────────────────────────────────────
CREATE TABLE Products (
    Id                    INT             IDENTITY(1,1) PRIMARY KEY,
    Name                  NVARCHAR(200)   NOT NULL,
    Slug                  NVARCHAR(200)   NOT NULL UNIQUE,
    Barcode               NVARCHAR(100)   NULL,
    Description           NVARCHAR(2000)  NULL,
    ShortDescription      NVARCHAR(500)   NULL,
    Price                 DECIMAL(18,2)   NOT NULL,
    DiscountPrice         DECIMAL(18,2)   NULL,
    DiscountPercent       INT             NOT NULL DEFAULT 0,
    CategoryId            INT             NOT NULL REFERENCES Categories(Id),
    Brand                 NVARCHAR(100)   NULL,
    Manufacturer          NVARCHAR(100)   NULL,
    Unit                  NVARCHAR(50)    NULL,
    StockQuantity         INT             NOT NULL DEFAULT 0,
    LowStockThreshold     INT             NOT NULL DEFAULT 10,
    ExpiryDate            DATETIME2       NULL,
    IsPrescriptionRequired BIT            NOT NULL DEFAULT 0,
    IsAvailableOnWhatsApp  BIT            NOT NULL DEFAULT 0,
    IsFeatured            BIT             NOT NULL DEFAULT 0,
    IsBestSeller          BIT             NOT NULL DEFAULT 0,
    IsActive              BIT             NOT NULL DEFAULT 1,
    MetaTitle             NVARCHAR(200)   NULL,
    MetaDescription       NVARCHAR(500)   NULL,
    MetaKeywords          NVARCHAR(500)   NULL,
    CreatedAt             DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt             DATETIME2       NULL
);

CREATE INDEX IX_Products_Slug       ON Products(Slug);
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Products_IsActive   ON Products(IsActive);
CREATE INDEX IX_Products_IsFeatured ON Products(IsFeatured);
CREATE INDEX IX_Products_Barcode    ON Products(Barcode);

-- ─── ProductImages ────────────────────────────────────────────────────────────
CREATE TABLE ProductImages (
    Id        INT           IDENTITY(1,1) PRIMARY KEY,
    ProductId INT           NOT NULL REFERENCES Products(Id) ON DELETE CASCADE,
    ImageUrl  NVARCHAR(500) NOT NULL,
    IsPrimary BIT           NOT NULL DEFAULT 0,
    SortOrder INT           NOT NULL DEFAULT 0,
    AltText   NVARCHAR(200) NULL
);

CREATE INDEX IX_ProductImages_ProductId ON ProductImages(ProductId);

-- ─── ProductVariants ─────────────────────────────────────────────────────────
CREATE TABLE ProductVariants (
    Id            INT           IDENTITY(1,1) PRIMARY KEY,
    ProductId     INT           NOT NULL REFERENCES Products(Id) ON DELETE CASCADE,
    Name          NVARCHAR(100) NOT NULL,
    Value         NVARCHAR(100) NULL,
    PriceModifier DECIMAL(18,2) NULL,
    StockQuantity INT           NOT NULL DEFAULT 0,
    IsActive      BIT           NOT NULL DEFAULT 1
);

CREATE INDEX IX_ProductVariants_ProductId ON ProductVariants(ProductId);

-- ─── Addresses ────────────────────────────────────────────────────────────────
CREATE TABLE Addresses (
    Id           INT           IDENTITY(1,1) PRIMARY KEY,
    UserId       INT           NOT NULL REFERENCES Users(Id) ON DELETE CASCADE,
    Label        NVARCHAR(100) NOT NULL DEFAULT 'Home',
    FullName     NVARCHAR(200) NOT NULL,
    PhoneNumber  NVARCHAR(20)  NOT NULL,
    AddressLine1 NVARCHAR(200) NOT NULL,
    AddressLine2 NVARCHAR(200) NULL,
    City         NVARCHAR(100) NOT NULL,
    Governorate  NVARCHAR(100) NOT NULL,
    PostalCode   NVARCHAR(20)  NULL,
    IsDefault    BIT           NOT NULL DEFAULT 0,
    CreatedAt    DATETIME2     NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_Addresses_UserId ON Addresses(UserId);

-- ─── Coupons ──────────────────────────────────────────────────────────────────
CREATE TABLE Coupons (
    Id                   INT            IDENTITY(1,1) PRIMARY KEY,
    Code                 NVARCHAR(50)   NOT NULL UNIQUE,
    Description          NVARCHAR(200)  NULL,
    DiscountType         INT            NOT NULL DEFAULT 0, -- 0=Percentage, 1=FixedAmount
    DiscountValue        DECIMAL(18,2)  NOT NULL,
    MinimumOrderAmount   DECIMAL(18,2)  NULL,
    MaximumDiscountAmount DECIMAL(18,2) NULL,
    UsageLimit           INT            NULL,
    UsedCount            INT            NOT NULL DEFAULT 0,
    UserUsageLimit       INT            NULL DEFAULT 1,
    ValidFrom            DATETIME2      NULL,
    ValidTo              DATETIME2      NULL,
    IsActive             BIT            NOT NULL DEFAULT 1,
    CreatedAt            DATETIME2      NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_Coupons_Code ON Coupons(Code);

-- ─── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE Orders (
    Id                  INT            IDENTITY(1,1) PRIMARY KEY,
    OrderNumber         NVARCHAR(50)   NOT NULL UNIQUE,
    UserId              INT            NOT NULL REFERENCES Users(Id),
    Status              INT            NOT NULL DEFAULT 0,
    -- 0=Pending,1=Confirmed,2=Processing,3=Shipped,4=Delivered,5=Cancelled,6=Refunded
    PaymentMethod       INT            NOT NULL DEFAULT 0,
    -- 0=CashOnDelivery,1=OnlinePayment,2=WhatsApp
    PaymentStatus       INT            NOT NULL DEFAULT 0,
    -- 0=Pending,1=Paid,2=Failed,3=Refunded
    SubTotal            DECIMAL(18,2)  NOT NULL,
    DeliveryFee         DECIMAL(18,2)  NOT NULL DEFAULT 0,
    Discount            DECIMAL(18,2)  NOT NULL DEFAULT 0,
    Total               DECIMAL(18,2)  NOT NULL,
    CouponId            INT            NULL REFERENCES Coupons(Id),
    AddressId           INT            NULL REFERENCES Addresses(Id),
    Notes               NVARCHAR(1000) NULL,
    AdminNotes          NVARCHAR(500)  NULL,
    TrackingNumber      NVARCHAR(200)  NULL,
    HasPrescriptionItems BIT           NOT NULL DEFAULT 0,
    PrescriptionImageUrl NVARCHAR(500) NULL,
    CreatedAt           DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt           DATETIME2      NULL,
    DeliveredAt         DATETIME2      NULL
);

CREATE INDEX IX_Orders_UserId      ON Orders(UserId);
CREATE INDEX IX_Orders_Status      ON Orders(Status);
CREATE INDEX IX_Orders_OrderNumber ON Orders(OrderNumber);
CREATE INDEX IX_Orders_CreatedAt   ON Orders(CreatedAt DESC);

-- ─── OrderItems ───────────────────────────────────────────────────────────────
CREATE TABLE OrderItems (
    Id          INT           IDENTITY(1,1) PRIMARY KEY,
    OrderId     INT           NOT NULL REFERENCES Orders(Id) ON DELETE CASCADE,
    ProductId   INT           NOT NULL REFERENCES Products(Id),
    VariantId   INT           NULL,
    ProductName NVARCHAR(200) NOT NULL,
    VariantName NVARCHAR(100) NULL,
    Quantity    INT           NOT NULL,
    UnitPrice   DECIMAL(18,2) NOT NULL,
    TotalPrice  DECIMAL(18,2) NOT NULL
);

CREATE INDEX IX_OrderItems_OrderId   ON OrderItems(OrderId);
CREATE INDEX IX_OrderItems_ProductId ON OrderItems(ProductId);

-- ─── OrderStatusHistory ───────────────────────────────────────────────────────
CREATE TABLE OrderStatusHistories (
    Id              INT            IDENTITY(1,1) PRIMARY KEY,
    OrderId         INT            NOT NULL REFERENCES Orders(Id) ON DELETE CASCADE,
    Status          INT            NOT NULL,
    Notes           NVARCHAR(500)  NULL,
    ChangedAt       DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
    ChangedByUserId INT            NULL REFERENCES Users(Id)
);

CREATE INDEX IX_OrderStatusHistories_OrderId ON OrderStatusHistories(OrderId);

-- ─── CartItems ────────────────────────────────────────────────────────────────
CREATE TABLE CartItems (
    Id        INT       IDENTITY(1,1) PRIMARY KEY,
    UserId    INT       NOT NULL REFERENCES Users(Id) ON DELETE CASCADE,
    ProductId INT       NOT NULL REFERENCES Products(Id),
    VariantId INT       NULL REFERENCES ProductVariants(Id),
    Quantity  INT       NOT NULL DEFAULT 1,
    AddedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_CartItems_UserId    ON CartItems(UserId);
CREATE UNIQUE INDEX UX_CartItems_UserProduct ON CartItems(UserId, ProductId, VariantId)
    WHERE VariantId IS NOT NULL;

-- ─── Reviews ─────────────────────────────────────────────────────────────────
CREATE TABLE Reviews (
    Id         INT            IDENTITY(1,1) PRIMARY KEY,
    ProductId  INT            NOT NULL REFERENCES Products(Id) ON DELETE CASCADE,
    UserId     INT            NOT NULL REFERENCES Users(Id),
    Rating     INT            NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment    NVARCHAR(1000) NULL,
    IsApproved BIT            NOT NULL DEFAULT 0,
    CreatedAt  DATETIME2      NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_Reviews_ProductId ON Reviews(ProductId);
CREATE INDEX IX_Reviews_UserId    ON Reviews(UserId);

-- ─── InventoryLogs ───────────────────────────────────────────────────────────
CREATE TABLE InventoryLogs (
    Id               INT            IDENTITY(1,1) PRIMARY KEY,
    ProductId        INT            NOT NULL REFERENCES Products(Id),
    ActionType       INT            NOT NULL,
    -- 0=StockIn,1=StockOut,2=Adjustment,3=OrderDeduction,4=OrderReturn
    QuantityBefore   INT            NOT NULL,
    QuantityChange   INT            NOT NULL,
    QuantityAfter    INT            NOT NULL,
    Notes            NVARCHAR(500)  NULL,
    OrderId          INT            NULL REFERENCES Orders(Id),
    CreatedAt        DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
    CreatedByUserId  INT            NULL REFERENCES Users(Id)
);

CREATE INDEX IX_InventoryLogs_ProductId ON InventoryLogs(ProductId);
CREATE INDEX IX_InventoryLogs_CreatedAt ON InventoryLogs(CreatedAt DESC);

-- ─── Settings ─────────────────────────────────────────────────────────────────
CREATE TABLE Settings (
    Id          INT            IDENTITY(1,1) PRIMARY KEY,
    [Key]       NVARCHAR(100)  NOT NULL UNIQUE,
    Value       NVARCHAR(MAX)  NULL,
    Description NVARCHAR(200)  NULL,
    [Group]     NVARCHAR(50)   NULL,
    UpdatedAt   DATETIME2      NOT NULL DEFAULT GETUTCDATE()
);

CREATE INDEX IX_Settings_Key   ON Settings([Key]);
CREATE INDEX IX_Settings_Group ON Settings([Group]);

-- ─────────────────────────────────────────────────────────────────────────────
--  SEED DATA
-- ─────────────────────────────────────────────────────────────────────────────

-- Roles
INSERT INTO Roles (Name, Description) VALUES
    ('Admin',       'Full system access'),
    ('Customer',    'Regular customer'),
    ('Pharmacist',  'Pharmacy staff member');

-- Default Settings
INSERT INTO Settings ([Key], Value, [Group], Description) VALUES
    ('pharmacy_name',          'PharmaCare',                     'general',  'Pharmacy display name'),
    ('pharmacy_phone',         '+201000000000',                  'general',  'Main phone number'),
    ('pharmacy_whatsapp',      '+201000000000',                  'general',  'WhatsApp contact number'),
    ('pharmacy_email',         'info@pharmacare.com',            'general',  'Contact email'),
    ('pharmacy_address',       'Cairo, Egypt',                   'general',  'Physical address'),
    ('currency',               'EGP',                            'general',  'Default currency'),
    ('delivery_fee',           '25',                             'shipping', 'Standard delivery fee'),
    ('free_delivery_threshold','300',                            'shipping', 'Free delivery threshold'),
    ('hero_title',             'Your Health, Our Priority',      'homepage', 'Hero banner title'),
    ('hero_subtitle',          'Quality medicines delivered to your door', 'homepage', 'Hero banner subtitle'),
    ('social_facebook',        '',                               'social',   'Facebook page URL'),
    ('social_instagram',       '',                               'social',   'Instagram page URL'),
    ('social_twitter',         '',                               'social',   'Twitter/X page URL');

-- Demo Categories
INSERT INTO Categories (Name, Slug, Description, SortOrder) VALUES
    ('Vitamins & Supplements', 'vitamins-supplements', 'Boost your health with quality supplements',    1),
    ('Pain Relief',            'pain-relief',          'Effective pain management products',            2),
    ('Skincare',               'skincare',             'Skincare and dermatology products',             3),
    ('Baby Care',              'baby-care',            'Safe products for babies and children',         4),
    ('Dental Care',            'dental-care',          'Oral hygiene products',                         5),
    ('First Aid',              'first-aid',            'Essential first aid supplies',                  6),
    ('Chronic Disease',        'chronic-disease',      'Medications for chronic conditions',            7),
    ('Eye & Ear',              'eye-ear',              'Eye drops and ear care products',               8);

-- Admin User (password: Admin@123)
-- BCrypt hash of 'Admin@123'
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, PhoneNumber, IsActive, IsEmailVerified) VALUES
    ('Admin', 'User', 'admin@pharmacare.com',
     '$2a$11$8LTzxuGWPkDjBDt3zz.Rk.vGkSa0WFPqzHBrEh5bO0XvXwxJoqLOe',
     '+201000000000', 1, 1);

-- Assign Admin role
INSERT INTO UserRoles (UserId, RoleId)
SELECT u.Id, r.Id
FROM   Users u, Roles r
WHERE  u.Email = 'admin@pharmacare.com'
AND    r.Name  = 'Admin';

GO

-- ─── Useful Views ─────────────────────────────────────────────────────────────

-- Product summary view
CREATE VIEW vw_ProductSummary AS
SELECT
    p.Id,
    p.Name,
    p.Slug,
    p.Price,
    p.DiscountPrice,
    p.DiscountPercent,
    p.StockQuantity,
    p.IsActive,
    p.IsFeatured,
    p.IsBestSeller,
    p.IsPrescriptionRequired,
    p.ExpiryDate,
    c.Name  AS CategoryName,
    c.Slug  AS CategorySlug,
    (SELECT TOP 1 ImageUrl FROM ProductImages WHERE ProductId = p.Id AND IsPrimary = 1) AS PrimaryImage,
    (SELECT COUNT(*) FROM Reviews       WHERE ProductId = p.Id AND IsApproved = 1)     AS ReviewCount,
    (SELECT AVG(CAST(Rating AS FLOAT))  FROM Reviews WHERE ProductId = p.Id AND IsApproved = 1) AS AvgRating,
    CASE WHEN p.StockQuantity = 0 THEN 1 ELSE 0 END AS IsOutOfStock,
    CASE WHEN p.StockQuantity > 0 AND p.StockQuantity <= p.LowStockThreshold THEN 1 ELSE 0 END AS IsLowStock
FROM Products p
JOIN Categories c ON c.Id = p.CategoryId;
GO

-- Order summary view
CREATE VIEW vw_OrderSummary AS
SELECT
    o.Id,
    o.OrderNumber,
    o.Status,
    o.PaymentMethod,
    o.PaymentStatus,
    o.Total,
    o.CreatedAt,
    u.FirstName + ' ' + u.LastName AS CustomerName,
    u.Email AS CustomerEmail,
    (SELECT COUNT(*) FROM OrderItems WHERE OrderId = o.Id) AS ItemCount
FROM Orders o
JOIN Users u ON u.Id = o.UserId;
GO

PRINT 'PharmacyDB schema created successfully!';
