import type { FastifyReply } from 'fastify'

import { FastifyRequest } from 'fastify'

// This method is just a mock
export function userHasAdminAccess(
    _request: FastifyRequest,
    _reply: FastifyReply,
    done: () => void,
) {
    // - Here we should check if the user is an admin
    // - If the user is not an admin, we should return a 403 Forbidden status
    done()
}
