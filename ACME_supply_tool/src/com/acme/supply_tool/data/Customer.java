package com.acme.supply_tool.data;

public class Customer implements ACMEData{

	private int id;
	private String firstName;
	private String lastName;
	
	public Customer(int id, String firstName, String lastname) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastname;
	}

	@Override
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

	public String getLastname() {
		return lastName;
	}

	public void setLastname(String lastname) {
		this.lastName = lastname;
	}
	
}
