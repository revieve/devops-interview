package com.acme.supply_tool.data;

public class CustomerRanking {

	private int id;
	private String firstName;
	private String lastName;
	private Double totalEuros;
	
	public CustomerRanking(int id, String firstName, String lastName, Double totalEuros) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.totalEuros = totalEuros;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Double getTotalEuros() {
		return totalEuros;
	}

	public void setTotalEuros(Double totalEuros) {
		this.totalEuros = totalEuros;
	}
	
	@Override
	public String toString() {
		
		return this.getId() + "," + this.getFirstName() + "," + this.getLastName() + "," + this.getTotalEuros();
		
	}
}
