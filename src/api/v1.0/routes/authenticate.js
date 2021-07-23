const express = require('express');
const router = express.Router();

const { userLogin } = require("../controllers/authenticate");

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user phone number
 *       example:
 *         email: abcde@fgh.com
 *         password: "asdew_922"
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The user's authentication managing API
 */


/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: User login/Authentication
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The user authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {// user login
    userLogin(req, res);
});


module.exports = router;