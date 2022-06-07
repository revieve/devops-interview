package com.acme.supply_tool;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Scanner;

import com.acme.supply_tool.data.OrderPrice;

public class ACMESupplyTool {

	public static void main(String[] args) {
		ACMEDataProvisioner dataProvisioner = new ACMEDataProvisioner();
		ACMEDataManager dataManager = new ACMEDataManager(dataProvisioner);

		// Welcome message.
		System.out.println("Welcome to ACME automated management system.");
		System.out.println(
				"Proceed to indicate the input files for loading the data, OR leave blank to load default files in current working dir.");

		// Ask user for file paths and feed them to the provisioner.
		requestData(dataProvisioner);

		try {
			dataManager.loadData();
			dataManager.saveData();

			System.out.println("Data loaded. Will proceed to generate (order_prices.csv, product_customers.csv, customer_ranking.csv) files.");
			System.out.println("Output csv files generated. Good bye..");

			//Lazy about proper exception handling.
		} catch (Exception exception) {
			System.out.println(exception.getMessage() + " Please check your files and try again.");
			System.out.println("The program cannot continue and will terminate.");

			System.exit(-1);
		}
	}

	private static void requestData(ACMEDataProvisioner dataProvisioner) {
		Scanner scanner = new Scanner(System.in);
		String input = "";

		System.out.println("Enter the customers data file path [customers.csv]:");
		input = scanner.nextLine();
		if (input != "")
			dataProvisioner.setpCustomers(input);
		else
			dataProvisioner.setpCustomers("customers.csv");
		input = "";

		System.out.println("Enter the products data file path [products.csv]:");
		input = scanner.nextLine();
		if (input != "")
			dataProvisioner.setpProducts(input);
		else
			dataProvisioner.setpProducts("products.csv");

		input = "";

		System.out.println("Enter the orders data file path [orders.csv]:");
		input = scanner.nextLine();
		if (input != "")
			dataProvisioner.setpOrders(input);
		else
			dataProvisioner.setpOrders("orders.csv");
	}

}
