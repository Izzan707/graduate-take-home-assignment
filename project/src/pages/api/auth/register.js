let users = [
  { username: 'testuser', email: 'testemail@gmail.com', password: 'testpassword' } 
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    users.push({ username, email, password });
    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
