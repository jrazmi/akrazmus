import faker from "faker";
import bcrypt from 'bcryptjs';


faker.seed(1779);

export const fakeUser = async (id) => ({
    id: id,
    email: faker.internet.email().trim().toUpperCase(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: await bcrypt.hash('cat', 10),
})