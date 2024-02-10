-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "timePreference" TEXT NOT NULL,
    "shippingTime" TIMESTAMP(3),
    "shippingDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrder" ADD CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
