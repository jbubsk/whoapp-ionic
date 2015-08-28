function interceptors($log, $q, $window, $injector) {
  var sessionStorage = $window.sessionStorage;

    return {
        'request': function (config) {
            config.headers.Authorization = 'Bearer ' + sessionStorage.token;
            $log.debug(config);
            return config;
        },
        'response': function (response) {
            $log.debug(response);
            return response;
        },
        'responseError': function (response) {
            var deferred = $q.defer(),
                $state = $injector.get('$state');

            if (response.data && response.data.code) {
                deferred.reject(response.data.code);
            } else {
                deferred.reject(response.status);
            }
            if (response.status === 401) {
                delete sessionStorage.token;
                $state.go('auth');
            }
            return $q.reject(response);
        }
    };
}

export default interceptors;
