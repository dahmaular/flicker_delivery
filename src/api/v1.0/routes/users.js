const { User } = require("../models/user");
const {
  registerUser,
  getUsers,
  updateUser,
  getUser,
} = require("../controllers/user");
const express = require("express");
const auth = require("../middleware/authorize");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The user first name
 *         lastName:
 *           type: string
 *           description: The user last name
 *         email:
 *           type: string
 *           description: The user email
 *         phoneNumber:
 *           type: string
 *           description: The user phone number
 *       example:
 *         id: d5fE_asz
 *         firstName: John
 *         lastName: Doe
 *         email: abcde@fgh.com
 *         phoneNumber: "08123456789"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPost:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user first name
 *         lastName:
 *           type: string
 *           description: The user last name
 *         email:
 *           type: string
 *           description: The user email
 *         phoneNumber:
 *           type: string
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: abcde@fgh.com
 *         phoneNumber: "08123456789"
 *         password: d5fE_asz
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */



router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});



/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPost'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPost'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  // register new user
  registerUser(req.body, res);
});


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get("/:id",  async (req, res) => {
  //get only 1 user
  getUser(req.params.id, res);
});



/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  // get all users
  getUsers(res);
});


/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update the user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserPost'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserPost'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", auth, async (req, res) => {
  updateUser(req, res);
});

module.exports = router;
