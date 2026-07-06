-- AlterTable
ALTER TABLE "Rental_Requests" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "occupation" VARCHAR(255),
ADD COLUMN     "phoneNumber" VARCHAR(20);
