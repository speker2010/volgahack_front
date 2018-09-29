$(document).ready(function () {
    console.log('hello world');
    var $ticketsEl = $('#tickets');
    if ($ticketsEl.length > 0) {
        var ticketsApp = new Vue({
            el: '#tickets',
            data: {
                tickets: [],
                error: ''
            },
            mounted() {
                var _this = this;
                $.ajax({
                    url: '/tasks.json',
                    method: 'GET',
                    type: 'json',
                    success: function (response) {
                        if (response.result) {
                            var tickets = response.data;
                            for (index in tickets) {
                                var ticket = tickets[index];
                                console.log(ticket.description)
                                ticket.description = markdown.toHTML(ticket.description);
                                _this.tickets.push(tickets[index]);
                            }
                        }
                    },
                    error: function (response) {
                        if (response.data) {
                            _this.error = e.data.error;
                        }
                    }
                });
            }
        });

    }
    var $signInEl = $('#sign-in');
    if ($signInEl.length > 0) {
        var signIn = new Vue({
            el: '#sign-in',
            data: {
                username: '',
                password: '',
                rememberMe: ''
            },
            methods: {
                submit: function (e) {
                    e.preventDefault();
                    var _this = this;

                    $.ajax({
                        url: '/sign-in.json',
                        data: {
                            username: _this.username,
                            password: _this.password,
                            "remember-me": _this.rememberMe
                        },
                        method: 'GET',
                        type: 'json',
                        success: function (response) {
                            if (response) {
                                console.log(repsonse, 'success');
                            }
                        },
                        error: function (response) {
                            if (response) {
                                console.log(response, 'error');
                            }
                        }
                    });
                }
            }
        });

    }
    var $signUpEl = $('#sign-up');
    if ($signUpEl.length > 0) {
        var signUpApp = new Vue({
            el: '#sign-up',
            data: {
                username: '',
                password: '',
                passwordRepeat: '',
                errorName: '',
                errorPass: ''
            },
            methods: {
                submit: function (e) {
                    e.preventDefault();
                    console.log(this.username);
                    console.log(this.password);
                    var _this = this;
                    $.ajax({
                        //url: 'http://192.168.1.128:7000/login',
                        url: '/sign-up.json',
                        data: {
                            username: _this.username,
                            password: _this.password,
                            passwordRepeat: _this.passwordRepeat
                            /*"remember-me": _this.rememberMe*/
                        },
                        method: 'GET',
                        success: function (e) {
                            console.log(e, 'success');
                        },
                        error: function (e) {
                            console.log(e, 'error');
                        }
                    });
                }
            }
        });

    }


    var app = new Vue({
        el: '#app',
        data: {
            hello: ''
        }
    });

    var $usersEl = $('#user');
    if ($usersEl.length > 0) {
        var usersApp = new Vue({
            el: '#user',
            data: {
                user: ''
            },
            mounted() {
                console.log(this.$el);
                try {
                    var userId = getCookie('userId');
                    if (!userId) {
                        userId = getUrlParameters("id", "", true);
                    }
                } catch (e) {
                    window.location.href = '/sign-up.html';
                }
                var _this = this;
                $.ajax({
                    url: '/user.json',
                    data: {
                        userId: userId
                    },
                    method: 'GET',
                    type: 'json',
                    success: function (respond) {
                        if (respond.result) {
                            _this.user = respond.data;
                            console.log(respond, 'success');
                        }
                    },
                    error: function (respond) {
                        if (respond) {
                            console.log(respond, 'success');
                        }
                    }
                });
            }
        });
    }

});

function getUrlParameters(parameter, staticURL, decode) {

    var currLocation = (staticURL.length) ? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool) return false;
}

var idParameter = getUrlParameters("id", "", true);
console.log(idParameter);

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}