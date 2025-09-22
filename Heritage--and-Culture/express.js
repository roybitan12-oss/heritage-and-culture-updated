const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample cultural heritage data (can be extended or hooked to a database)
let heritageSites = [
  {
    id: 1,
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    description: 'A UNESCO World Heritage site, famous for its Mughal architecture.'
  },
  {
    id: 2,
    name: 'Qutub Minar',
    location: 'Delhi',
    description: 'Tallest brick minaret in the world and an important historical landmark.'
  }
];

// Get all heritage sites
app.get('/heritage-sites', (req, res) => {
  res.json(heritageSites);
});

// Get a single heritage site by ID
app.get('/heritage-sites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const site = heritageSites.find(s => s.id === id);
  if (!site) {
    return res.status(404).json({ message: 'Heritage site not found' });
  }
  res.json(site);
});

// Create a new heritage site
app.post('/heritage-sites', (req, res) => {
  const { name, location, description } = req.body;
  if (!name || !location || !description) {
    return res.status(400).json({ message: 'Name, location, and description are required' });
  }
  const newSite = {
    id: heritageSites.length + 1,
    name,
    location,
    description
  };
  heritageSites.push(newSite);
  res.status(201).json(newSite);
});

// Update a heritage site by ID
app.put('/heritage-sites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, location, description } = req.body;
  const site = heritageSites.find(s => s.id === id);
  if (!site) {
    return res.status(404).json({ message: 'Heritage site not found' });
  }
  if (!name || !location || !description) {
    return res.status(400).json({ message: 'Name, location, and description are required' });
  }
  site.name = name;
  site.location = location;
  site.description = description;
  res.json(site);
});

// Delete a heritage site by ID
app.delete('/heritage-sites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = heritageSites.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Heritage site not found' });
  }
  heritageSites.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Cultural Heritage API running on http://localhost:${port}`);
});
