-- CreateTable
CREATE TABLE "employeeDetail" (
    "id" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "salary" TEXT NOT NULL,

    CONSTRAINT "employeeDetail_pkey" PRIMARY KEY ("id")
);
