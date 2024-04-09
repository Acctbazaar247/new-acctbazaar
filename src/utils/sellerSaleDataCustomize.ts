interface AccountData {
  price: number;
  Orders: {
    createdAt: string;
  } | null;
}

interface MonthlySale {
  month: string;
  totalSold: number;
}

export function customizeData(data: AccountData[]): MonthlySale[] {
  const monthlySales: { [key: string]: number } = {};

  data.forEach((account) => {
    if (account?.Orders?.createdAt) {
      const month = new Date(account.Orders.createdAt).getMonth();
      const monthName = new Date(0, month).toLocaleString("en-US", {
        month: "short",
      });

      if (!monthlySales[monthName]) {
        monthlySales[monthName] = 0;
      }

      monthlySales[monthName] += account.price;
    }
  });

  const formattedData: MonthlySale[] = Object.entries(monthlySales).map(
    ([month, totalSold]) => ({
      month,
      totalSold,
    })
  );

  return formattedData;
}

// Example usage with provided data
const exampleData: AccountData[] = [
  {
    price: 32,
    Orders: {
      createdAt: "2024-03-24T09:04:03.073Z",
    },
  },
  {
    price: 231,
    Orders: {
      createdAt: "2024-03-24T18:48:07.269Z",
    },
  },
];

//   const formattedData = customizeData(exampleData);
//   console.log(formattedData);
