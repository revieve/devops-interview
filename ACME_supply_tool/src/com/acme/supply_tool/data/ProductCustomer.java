package com.acme.supply_tool.data;

import java.util.List;

public class ProductCustomer {

	private int id;
	private List<Integer> customerIds;
	
	public ProductCustomer(int id, List<Integer> customerIds) {
		super();
		this.id = id;
		this.customerIds = customerIds;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<Integer> getCustomerIds() {
		return customerIds;
	}
	public void setCustomerIds(List<Integer> customerIds) {
		this.customerIds = customerIds;
	}
	
	public void addCustomer(int customer) {
		this.customerIds.add(customer);
	}
	
	@Override
	public String toString() {
		
		String customers = "";
		
		for(int id : this.getCustomerIds()) {
			customers += id + " ";
		}
		
		//The customers.length() - 1 is in order to ignore the last space added before.
		return this.getId() + "," + customers.substring(0, customers.length()-1);
		
	}
}
