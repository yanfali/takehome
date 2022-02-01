// implementation of the security schemes in the openapi specification

class Security {
  constructor() {}

  initialize(schemes){
    // schemes will contain securitySchemes as found in the openapi specification
    console.log("Initialize:", JSON.stringify(schemes));
  }


  // Security scheme: 0
  // Type: undefined
  async 0(req, reply, params) {
    console.log("0: Authenticating request");
    
    // If validation fails: throw new Error('Could not authenticate request')
    // Else, simply return.

    // The request object can also be mutated here (e.g. to set 'req.user')
  }

  // Security scheme: 1
  // Type: undefined
  async 1(req, reply, params) {
    console.log("1: Authenticating request");
    
    // If validation fails: throw new Error('Could not authenticate request')
    // Else, simply return.

    // The request object can also be mutated here (e.g. to set 'req.user')
  }

  // Security scheme: 2
  // Type: undefined
  async 2(req, reply, params) {
    console.log("2: Authenticating request");
    
    // If validation fails: throw new Error('Could not authenticate request')
    // Else, simply return.

    // The request object can also be mutated here (e.g. to set 'req.user')
  }
}

export default new Security();
