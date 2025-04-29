Here is a list of the improvements we definitely need to be done:

-   JWT Authentication for the users
-   RBAC authorization (to make sure the user's only have access to the right level of permission information)
-   API versioning
-   More integration and unit tests
-   Configure CI/CD (can be CircleCI)
-   Tenant level check, to make sure tenant can have an access to their users / orders / etc
-   Tenant level check can also be configured at the database level, to be 100% safe
-   Add indexes
    -   identify the frequently performed read operations (for example in our case, we can create a composite index for user_balance_history on user_id and date, definitely add indexes for the orders)
-   Add cache (Redis):
    -   High TTL for the completed orders (if we have status) / menu at the tenant level
    -   Low TTL for pending orders
-   Add more logs accross the server to make sure we can identify the errors
-   Order service can be moved out of the monolith to make sure we can concurrently process million of orders and don't block the main application:
    -   We can use Message Broker (RabbitMQ for example) and consume the messages by OrderProcessor service
    -   OrderProcessor can be horizontally scalled on demand
-   In front of the main app we should add Load Balancer, that does TLS termination and directs the traffic to least used node (or choose another strategy by measuring different aspects)
