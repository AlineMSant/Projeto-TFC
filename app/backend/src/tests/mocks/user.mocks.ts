const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'password',
}

const validLogin = {
  email: 'admin@admin.com',
  password: 'password'
}

const invalidEmail = {
  email: 'invalid-admin-com',
  password: 'password'
}

const invalidPassword = {
  email: 'admin@admin.com',
  password: 'inv'
}

const notFoundEmail = {
  email: 'xablau@gmail.com',
  password: 'password'
}

const notPassword = {
  email: 'admin@admin.com',
  password: 'wrong-password'
}

const notKeyEmail = {
  xablau: 'admin@admin.com',
  password: 'wrong-password'
}

export {
  user,
  validLogin,
  invalidEmail,
  invalidPassword,
  notFoundEmail,
  notPassword,
  notKeyEmail,
};