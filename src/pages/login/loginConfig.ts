enum register_statusCode {
   SUCCESS = 200,
   REPEAT = 6
}

enum login_statusCode {
   SUCCESS = 200,
   FAIL = 6,
   NOTFOUND = 2,
   PASSWORD_ERROR = 503
}

export default {
   register_statusCode,
   login_statusCode
};
