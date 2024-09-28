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
  { id: 1, name: 'Luke Skywalker', role: 'Jedi', planet: 'Tatooine' },
  { id: 2, name: 'Darth Vader', role: 'Sith Lord', planet: 'Tatooine' },
  { id: 3, name: 'Leia Organa', role: 'Princess', planet: 'Alderaan' },
];

// Helper function to find a character by ID
const findCharacterById = (id) => characters.find((character) => character.id === id);

// List all characters
server.get('/characters', async (request, reply) => {
  return characters;
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
