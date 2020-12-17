import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Super Admin',
    email: 'brettbedarf.dev@gmail.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@doe.com',
    password: bcrypt.hashSync('user123', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@doe.com',
    password: bcrypt.hashSync('user123', 10),
  },
];

export default users;
