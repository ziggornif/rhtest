import axios from "axios";

const BASE_URL = import.meta.env.VITE_GITPOD_WORKSPACE_URL
	? `https://8080-${
			import.meta.env.VITE_GITPOD_WORKSPACE_URL.split("https://")[1]
	  }`
	: "http://localhost:8080";

async function create(employee) {
	const { data } = await axios.post(
		`${BASE_URL}/api/ajouter?id=${employee.id}&firstname=${employee.firstname}&lastname=${employee.lastname}&salary=${employee.salary}&level=${employee.level}`,
	);
	return data;
}

async function fetch() {
	const { data } = await axios.get(`${BASE_URL}/api/rechercher?mode=all`);
	return data;
}

async function search(name) {
	const { data } = await axios.get(`${BASE_URL}/api/rechercher?name=${name}`);
	return [...data];
}

async function update(employee) {
	const { data } = await axios.post(
		`${BASE_URL}/api/modifier/${employee.id}?firstname=${employee.firstname}&lastname=${employee.lastname}&salary=${employee.salary}&level=${employee.level}`,
	);
	return data;
}

async function deleteOne(employee) {
	const { data } = await axios.delete(`${BASE_URL}/api/supprimer?id=${employee.id}`);
	return data;
}

async function deleteAll(apiToken) {
	await axios.delete(`${BASE_URL}/api/deleteall`, {
		headers: {
			Authorization: `${apiToken}`,
		},
	});
}

async function resetData(apiToken) {
	const { data } = await axios.post(`${BASE_URL}/api/datatest`, null, {
		headers: {
			Authorization: `${apiToken}`,
		},
	});
	return data;
}

const emptyEmployee = {
	id: "",
	firstname: "",
	lastname: "",
	salary: "",
	level: "",
};

export {
	create, deleteAll,
	deleteOne, emptyEmployee, fetch, resetData, search,
	update
};

