const routes = {
    "message":"hello",
    "github":"https://github.com/iamcvarma/",
    "POST  /user"  : "create a new user ( req body must have with username and password )",
    "POST  /signin"  : "returns JWT token ( req bidy must have with username and password)",
    API:{
        "note": "every req must have a authorization header with JWT Bearer token",
        PRODUCT:{
            "GET  /api/product"  : "returns a list of all the products user created",
            "GET  /api/product/:id"  : "returns a product with a specified ID",
            "POST  /api/product"  : "create a new porduct ( must pass product name )",
            "PUT  /api/product/:id"  : " update a product",
            "DELETE  /api/product/:id"  : "delete a product",
        },
        CHANGELOG:{
            "GET  /api/update": "returns all the change log updates of every product",
            "GET  /api/update/:id": "returns all change log update  of product with ID",
            "POST  /api/update": " create a new changelog update ( must pass valid Product ID )",
            "PUT  /api/update/:id": "update a change log",
            "DELETE  /api/update/:id": "delete a change log"
        },
        UPDATEPOINT:{
            "GET  /api/updatepoint":" returns all the changelogs with updatepoints for every product",
            "GET  /api/updatepoint/:id": "returns a updatepoint",
            "POST  /api/updatepoint": "creates a new updatepoint for a change log",
            "PUT  /api/updatepoint/:id": "updates a updatepoint",
            "DELETE  /api/updatepoint/:id": "deletes a updatepoint"
        }
    }

}

export default routes