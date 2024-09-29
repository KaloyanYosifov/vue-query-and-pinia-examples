import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify({ logger: true });

// Register CORS plugin with default or custom settings
server.register(cors, {
  origin: '*',  // Allow all origins (for testing). You can restrict this in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

// Mock data for Star Wars characters
let characters = [
  {  name: 'Luke Skywalker', role: 'Jedi', planet: 'Tatooine' },
  {  name: 'Darth Vader', role: 'Sith Lord', planet: 'Tatooine' },
  {  name: 'Darth Sidious', role: 'Sith Lord', planet: 'Naboo' },
  {  name: 'Sheev Palpatine', role: 'Chancellor', planet: 'Naboo' },
  {  name: 'Padme Amidala', role: 'Senator', planet: 'Naboo' },
  {  name: 'Leia Organa', role: 'Princess', planet: 'Alderaan' },
  {  name: 'Obi-Wan Kenobi', role: 'Jedi', planet: 'Stewjon' },
  {  name: 'Mace Windu', role: 'Jedi', planet: 'Haruun Kal' },
  {  name: 'Yoda', role: 'Jedi', planet: 'Mysterious' },
  {  name: 'Anakin Skywalker', role: 'Jedi', planet: 'Tatooine' },
  {  name: 'Chewbacca', role: 'Jedi', planet: 'Kashyyyk' },
  {  name: 'R2-D2', role: 'Robot', planet: 'Naboo' },
  {  name: 'C-3PO', role: 'Robot', planet: 'Tatooine' },
];

characters.map((character, id) => ({
  id: id + 1,
  createdAt: (new Date()).toISOString(),
  ...character,
}))

// Helper function to find a character by ID
const findCharacterById = (id) => characters.find((character) => character.id === id);

// List all characters
server.get('/characters', async (request, reply) => {
  const page = Number(request.query?.page || 1);
  const limit = Number(request.query?.limit || 3);
  const sorted = characters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const startPage = (page - 1) * limit;
  const endPage = page * limit;
  const hasMorePages = endPage < sorted.length;
  
  return {
    hasMorePages,
    data: sorted.slice(startPage, endPage),
    nextPage: hasMorePages ? page + 1 : null,
  };
});

// Fetch a single character by ID
server.get('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  const character = findCharacterById(Number(id));

  if (!character) {
    return reply.status(404).send({ error: 'Character not found' });
  }

  return character;
});

// Create a new character
server.post('/characters', async (request, reply) => {
  const { name, role, planet } = request.body;

  // Validate request body
  if (!name || !role || !planet) {
    return reply.status(400).send({ error: 'Invalid data' });
  }

  const newCharacter = {
    id: characters.length + 1,
    name,
    role,
    planet,
    createdAt: (new Date()).toISOString(),
  };

  characters.push(newCharacter);

  return reply.status(201).send(newCharacter);
});

// Update an existing character
server.put('/characters/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, role, planet } = request.body;
  
  const character = findCharacterById(Number(id));

  if (!character) {
    return reply.status(404).send({ error: 'Character not found' });
  }

  // Update character data
  if (name) character.name = name;
  if (role) character.role = role;
  if (planet) character.planet = planet;

  return reply.send(character);
});

// Delete a character by ID
server.delete('/characters/:id', async (request, reply) => {
  const { id } = request.params;

  const characterIndex = characters.findIndex((character) => character.id === Number(id));

  if (characterIndex === -1) {
    return reply.status(404).send({ error: 'Character not found' });
  }

  // Remove the character from the array
  characters.splice(characterIndex, 1);

  return reply.send({ message: 'Character deleted' });
});

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000 });
    server.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
