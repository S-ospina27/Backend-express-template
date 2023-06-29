// globalFunc.js

function success(message,data="") {
    const response = {
      status: 'success',
      message: message,
      data:data
    };
    
    this.json(response);
  }
  
  function error(message,data="") {
    const response = {
      status: 'error',
      message: message,
      data:data
    };
    
    this.json(response);
  }
  
 export function globalFuncMiddleware(req, res, next) {
    res.success = success;
    res.error = error;
    next();
  }
  