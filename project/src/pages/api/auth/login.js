let users = [
  { email: 'testuser@gmail.com', password: 'testpassword' } 
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Request body:', req.body); // Log the request body
    //Do you think it is a good practice to log user password in the console ?
    const { email, password } = req.body;
    //how can you improve this line of code for security best practices
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
     // How can do you make the error to propergate to the nest function ?
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
