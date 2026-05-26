const USERS_KEY = 'bayani_users';
const CURRENT_USER_KEY = 'bayani_currentUser';

const parse = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
};

export const getUsers = () => parse(USERS_KEY, []);
export const getCurrentUser = () => parse(CURRENT_USER_KEY, null);

export const signUp = ({ name, phone, email, password, role }) => {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { error: 'An account with this email already exists.' };
  }
  const user = { name, phone, email, password, role };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { user };
};

export const login = ({ email, password }) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return { error: 'Incorrect email or password.' };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { user };
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
