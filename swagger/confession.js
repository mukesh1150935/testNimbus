/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      confessionSchema:
 *          type: object
 *          properties:
 *           content:
 *            type: string
 *            description: text content of the confession made
 *           creator:
 *            type: object
 *            description: author of the confession
 *           secretName: 
 *            type: string
 *            description: secret name or stage name
 *           date:
 *            type: date
 *            description: date and time of confession made
*
*/


/**
 * @swagger
 * /confession:
 *  get:
 *      tags: ['Confession']
 *      summary: returns all confession new first
 *      responses:
 *          '200':    
 *              description: all confessions
 *              content: 
 *                  application/json:
 *                      schema:

 *                              
 *          '500':
 *              description: could not fetch data!
 */


/**
 * @swagger
 * /confession:
 *  post:
 *      tags: ['Confession']
 *      summary: create a new confession
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                         
 *                          example:
 *                              content: Love is fake, dont fall for it,
 *                              creator: 640f6c9b02577bc6e794c8d5
 *                                                    
 *
 *      responses:
 *          '201':    
 *              description: confession created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/User' 
 *          '500':
 *              description: could not fetch data!
 */
