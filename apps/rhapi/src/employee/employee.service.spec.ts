import { beforeAll, describe, expect, it } from "vitest";
import { EmployeeRepository } from "./employee.repository";
import { EmployeeService } from "./employee.service";
describe("Employee unit tests", () => {
	let employeeService: EmployeeService;

	beforeAll(() => {
		employeeService = new EmployeeService(new EmployeeRepository());
	});

	it("should list employees", async () => {
		const employees = await employeeService.list();
		expect(employees).toHaveLength(3);
	});

	it("should get employee by name", async () => {
		const employee = await employeeService.getByName("DUPOND");
		expect(employee).toHaveLength(1);
	});

	it("should have an error while adding employee with negative salary", async () => {
		expect(() =>
			employeeService.add("test", "john", "doe", "-10", "1"),
		).rejects.toThrow("Le salaire doit être un nombre positif");
	});

	it("should have an error while adding employee with level > 10", async () => {
		expect(() =>
			employeeService.add("test", "john", "doe", "10", "11"),
		).rejects.toThrow("Le niveau doit être > -10 et < 10");
	});

	it("should have an error while adding employee without firstname", async () => {
		expect(() =>
			employeeService.add("test", "", "doe", "10", "4"),
		).rejects.toThrow("Le prénom est obligatoire");
	});

	it("should have an error while adding employee without lastname", async () => {
		expect(() =>
			employeeService.add("test", "john", "", "10", "4"),
		).rejects.toThrow("Le nom est obligatoire");
	});

	it("should have an error while adding employee without id", async () => {
		expect(() =>
			employeeService.add("", "john", "doe", "10", "4"),
		).rejects.toThrow("Le matricule est obligatoire");
	});

	it("should have an error while adding employee if employee already exists", async () => {
		expect(() =>
			employeeService.add("SAL1", "john", "doe", "10", "4"),
		).rejects.toThrow("Le matricule existe déjà");
	});

	it("should create employee", async () => {
		await employeeService.add("DOEJ", "john", "doe", "10", "4");
		const employee = await employeeService.getByName("doe");
		expect(employee).toEqual([
			expect.objectContaining({
				id: "DOEJ",
				firstname: "john",
				lastname: "doe",
				salary: "10",
				level: "4",
			}),
		]);
	});

	it("should have an error while updating employee if doesn't exists", async () => {
		expect(() =>
			employeeService.update("notexists", "john", "doe", "10", "4"),
		).rejects.toThrow("Le matricule n'a pas été trouvé");
	});

	it("should update employee", async () => {
		await employeeService.update("SAL1", "Pierre", "DURAND", "333", "2");
		const employee = await employeeService.getByName("DURAND");
		expect(employee).toEqual([
			expect.objectContaining({
				id: "SAL1",
				firstname: "Pierre",
				lastname: "DURAND",
				salary: "333",
				level: "2",
			}),
		]);
	});
});
