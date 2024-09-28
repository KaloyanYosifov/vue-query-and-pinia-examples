import { createWebHashHistory, createRouter } from 'vue-router'

import CharacterListing from './CharacterListing.vue'
import CreateCharacter from './CreateCharacter.vue'
import EditCharacter from './EditCharacter.vue'

const routes = [
    { name: 'home', path: '/', component: CharacterListing },
    { name: 'character-create', path: '/create', component: CreateCharacter },
    { name: 'character-edit', path: '/edit/:id', component: EditCharacter },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
