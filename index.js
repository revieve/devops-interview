import { createReadStream } from "fs";
import fs from "fs";
import Papa from "papaparse";

const read_data = (path) => {
  const read_stream = createReadStream(path, "utf8");
  return new Promise((resolve, reject) => {
    Papa.parse(read_stream, {
      header: true,
      complete(results, read_stream) {
        resolve(results.data);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

const export_CSV = (data, file_name) => {
  let csv_string;
  if (file_name === "order_prices") {
    csv_string = [["id", "euros"], ...data.map((item) => [item.id, item.euros])]
      .map((e) => e.join(","))
      .join("\n");
  } else if (file_name === "product_customers") {
    csv_string = [
      ["id", "customer_ids"],
      ...data.map((item) => {
        const ids = item.customer_ids.join(" ");
        return [item.id, ids];
      }),
    ]
      .map((e) => e.join(","))
      .join("\n");
  } else if (file_name === "customer_ranking") {
    csv_string = [
      ["id", "firstname", "lastname", "total_euros"],
      ...data.map((item) => [
        item.id,
        item.firstname,
        item.lastname,
        item.total_euros,
      ]),
    ]
      .map((e) => e && e.join(","))
      .join("\n");
  }
  fs.writeFile(`outputs/${file_name}.csv`, csv_string, (err) => {
    console.log(err || `Export ${file_name} successfully.`);
  });
};

const main = async () => {
  try {
    const productsData = await read_data("products.csv");
    const customersData = await read_data("customers.csv");
    const ordersData = await read_data("orders.csv");

    //========= TASK 1 ==========

    const order_prices = await ordersData.map((order) => {
      const order_list = order.products.split(" ");

      let euros = 0;
      order_list.forEach((item, index) => {
        for (let i = 0; i < productsData.length; i++) {
          if (productsData[i].id === item) {
            euros += Number(productsData[i].cost);
          }
        }
      });

      return {
        id: order.id,
        euros: euros,
      };
    });

    export_CSV(order_prices, "order_prices");

    console.log("order_prices:", order_prices);

    //========= TASK 2 ==========

    const product_customers = await productsData.map((product) => {
      const customer_ids = [];
      ordersData.forEach((order) => {
        if (order.products.includes(product.id)) {
          customer_ids.push(order.customer);
        }
      });
      return {
        id: product.id,
        customer_ids: customer_ids,
      };
    });

    export_CSV(product_customers, "product_customers");

    console.log("product_customers:", product_customers);

    //========= TASK 3 ==========

    const customer_ranking = await customersData.map((customer) => {
      const customer_id = customer.id;
      const order_ids = [];
      ordersData.forEach((order) => {
        if (customer_id === order.customer) {
          order_ids.push(order.id);
        }
      });

      let total_euros = 0;
      order_ids.forEach((item, index) => {
        for (let i = 0; i < order_prices.length; i++) {
          if (order_prices[i].id === item) {
            total_euros += Number(order_prices[i].euros);
          }
        }
      });
      return {
        id: customer_id,
        firstname: customer.firstname,
        lastname: customer.lastname,
        total_euros: total_euros,
      };
    });
    customer_ranking.sort((a, b) =>
      a.total_euros < b.total_euros ? 1 : b.total_euros < a.total_euros ? -1 : 0
    );

    console.log("customer_ranking", customer_ranking);
    export_CSV(customer_ranking, "customer_ranking");
  } catch (err) {
    console.error("Could not parse json", err);
  }
};
main();
