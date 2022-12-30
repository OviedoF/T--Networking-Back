const express = require("express");
const path = require("path");
const router = express.Router();
const usersControllers = require(path.join(__dirname, '..', 'controllers', 'users.controller'));
const { isAdmin } = require(path.join(__dirname, '..', 'middlewares', 'authRoles'));

/**
 * @openapi
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          properties:
 *              userImage:
 *                  type: string
 *                  description: image user
 *              name:
 *                  type: string
 *                  description: name user
 *              username:
 *                  type: string
 *                  description: name user
 *              cellphone:
 *                  type: number
 *                  description: mobile user
 *              email:
 *                  type: string
 *                  description: email user
 *              userId:
 *                  type: number
 *                  description: id user
 *              password:
 *                  type: string
 *                  description: password user
 *              roles:
 *                  type: array
 *                  items:
 *                      type: string
 *              wishList:
 *                  type: array
 *                  items:
 *                      type: string
 *              shoppingCart:
 *                  type: array
 *                  items:
 *                      type: string
 *              shoppingHistory:
 *                  type: array
 *                  items:
 *                      type: string
 *              wallet:
 *                  type: number
 *                  description: wallet user
 *              notifications:
 *                  type: array
 *                  items:
 *                      type: string
 *              directions:
 *                  type: array
 *                  items:
 *                      type: string
 *              socialMedia:
 *                  type: array
 *                  items:
 *                      type: string
 *              subscription:
 *                  type: array
 *                  items:
 *                      type: string
 *              nameSubscription:
 *                  type: string
 *                  description: name subscription
 *              daysSubscription:
 *                  type: number
 *                  description: days subscription
 *              description:
 *                  type: string
 *                  description: description subscription
 *              imageSubscription:
 *                  type: string
 *                  description: image subscription
 *              imageQr:
 *                  type: string
 *                  description: image qr
 *          required:
 *              - userImage
 *              - name
 *              - username
 *              - email
 *              - userId
 *              - password
 *          example:
 *              userImage:
 *              name: Juan Tavares
 *              username: UsuarioExample
 *              email: Juancito@gmail.com
 *              userId: 1532
 *              password: 123456789
 */

/**
 *  @openapi
 *  /api/users/: 
 *      get:
 *          summary: return all users
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: Todos los usuarios
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Users'
 */

router.get('/', isAdmin, usersControllers.getAllUsers);

/**
 *  @openapi
 *  /api/users/admin: 
 *      get:
 *          summary: return admin
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: Admin
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Users'
 */

router.get('/admin', isAdmin, usersControllers.getAdminUser);

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *      summary: return a user
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the user id 
 *      responses:
 *          200:
 *              description: Usuario por id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Users'
 *          404:
 *              description: user not found
 */

router.get('/:id', usersControllers.getUserById)

/**
 * @openapi
 * /api/users/{id}/updateUser:
 *  put:
 *      summary: update a user
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Users'  
 *      responses:
 *          200:
 *              description: user update
 *          404:
 *              description: user not found
 */

router.put('/:id/updateUser', isAdmin, usersControllers.updateUserAdmin);

/**
 * @openapi
 * /api/users/{id}/updateUserImage:
 *  put:
 *      summary: update a user
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userImage:
 *                              type: string
 *      responses:
 *          200:
 *              description: user update
 *          404:
 *              description: user not found
 */

router.put('/:id/updateUserImage', isAdmin, usersControllers.updateUserAdminImage);
router.put('/:id/updateUserSocial', usersControllers.updateSocialMedia);

module.exports = router;
