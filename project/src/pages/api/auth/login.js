let users = [
  { email: 'testuser@gmail.com', password: 'testpassword' } 
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Request body:', req.body); // Log the request body
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      console.log('User found:', user); // Log the found user
      return res.status(200).json({ token: 'fake-jwt-token' });
    } else {
      console.log('Invalid credentials'); // Log invalid credentials
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
