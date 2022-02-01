// implementation of the operations in the openapi specification

class Service {
  constructor() {}

  alerts = [];
  // Operation: postAlertSave
  // URL: /alert/save
  // summary:  Save an alert
  // req.body
  //   type: object
  //   required:
  //     - message
  //     - frequency
  //     - emailRecipients
  //   properties:
  //     message:
  //       type: string
  //       minLength: 1
  //       maxLength: 1000
  //     frequency:
  //       type: string
  //       enum:
  //         - hourly
  //         - daily
  //     emailRecipients:
  //       type: array
  //       items:
  //         type: string
  //         format: email
  //       minLength: 1
  //       maxLength: 10
  //
  // valid responses
  //   '200':
  //     description: successful operation
  //     schema:
  //       type: object
  //       properties: &ref_0
  //         code:
  //           type: integer
  //           format: int32
  //         type:
  //           type: string
  //         message:
  //           type: string
  //   '400':
  //     description: Invalid Alert
  //     schema:
  //       type: object
  //       properties: *ref_0
  //   '500':
  //     description: Something bad happened
  //     schema:
  //       type: object
  //       properties: *ref_0
  //

  async postAlertSave(req, reply) {
    console.log("postAlertSave", req.body);
    // openapi should have validated all the fields
    // of course in real life you would escape the text in the message just in case
    this.alerts.push(req.body);

    return { key: "value" };
  }


  // Operation: getAlertTest
  // URL: /alert/test
  // summary:  Test saved alerts
  // valid responses
  //   '200':
  //     description: successful test
  //     schema:
  //       type: object
  //       properties: &ref_0
  //         code:
  //           type: integer
  //           format: int32
  //         type:
  //           type: string
  //         message:
  //           type: string
  //   '418':
  //     description: No alerts registered
  //     schema:
  //       type: object
  //       properties: *ref_0
  //   '500':
  //     description: Something bad happened
  //     schema:
  //       type: object
  //       properties: *ref_0
  //

  async getAlertTest(req, reply) {
    console.log("getAlertTest", req.params);
    if (this.alerts.length === 0) {
      return reply.code(418).send('418 No alerts registered')
    }
    console.log(this.alerts);
    return { key: "value" };
  }
}

export default opts => new Service(opts);
