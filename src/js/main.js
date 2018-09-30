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
                        url: 'http://192.168.1.128:7000/registration',
                        data: {
                            username: _this.username,
                            password: _this.password,
                            "remember-me": _this.rememberMe
                        },
                        method: 'POST',
                        type: 'json',
                        success: function (response) {
                            if (response) {
                                console.log(response, 'success');
                            }
                        },
                        error: function (response) {
                            if (response) {
                               /* document.getElementById("message").innerHTML=
                                    '<div class="card">\n' +
                                    '    <div class="card-header deep-orange lighten-1 white-text">\n' +
                                    '        Неправильный пароль или имя пользоваеля.\n' +
                                    '    </div>\n' +
                                    '</div>';*/
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
                        method: 'POST',
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

    var $userEditEl = $('#user-edit');
    if ($userEditEl.length > 0) {
        var userEditApp = new Vue({
            el: $userEditEl[0],
            data: {
                username: '',
                about: '',
                social_link: ''
            },
            methods: {
                submit: function (e) {
                    e.preventDefault();
                    var _this = this;
                    vd(this.username, this.about, this.social_link, 'username about link');
                    $.ajax({
                        url: '/user-edit.json',
                        data: {
                            username: _this.username,
                            about: _this.about,
                            social_link: _this.social_link
                        },
                        method: 'GET',
                        type: 'json',
                        success: function (respond) {
                            if (respond) {

                                vd(respond, 'success');
                            }
                        },
                        error: function (respond) {
                            if (respond) {
                                console.log(respond, 'error');
                            }
                        }
                    })
                }
            }
        });
    }

    var $createTicketEl = $('#create-ticket');
    if ($createTicketEl.length > 0) {

        var createTicketApp = new Vue({
            el: $createTicketEl[0],
            data: {
                title: '',
                description: '',
                tags: [],
                price: ''
            },
            methods: {
                submit: function (e) {
                    e.preventDefault();
                    vd(this.title, this.description, this.tags, this.price, 'title description tags price');
                    var _this = this;
                    $.ajax({
                        url: '/create-ticket.json',
                        data: {
                            title: _this.title,
                            description: _this.description,
                            tags: _this.tags,// todo: возможно нужно переделывать если будет массив
                            price: _this.price
                        },
                        method: 'GET',
                        type: 'json',
                        success: function (response) {
                            if (response) {
                                vd(response, 'success');
                            }
                        },
                        error: function (response) {
                            if (response) {
                                vd(response, 'error');
                            }
                        }
                    });
                }
            }
        });
    }

    var $lkInformerEl = $('#lk-informer');
    if ($lkInformerEl.length > 0) {
        var lkInfromerApp = new Vue({
            el: $lkInformerEl[0],
            data: {
                isAuth: false
            }
        });
        if (isAuth()) {
            lkInfromerApp.isAuth = true;
        }
    }

    var $ticketDetailEl = $('#ticket-detail');
    if ($ticketDetailEl.length > 0) {
        var ticketDetailApp = new Vue({
            el: $ticketDetailEl[0],
            data: {
                title: '',
                description: '',
                price: '',
                tags: []
            },
            mounted() {
                var ticketId;
                try {
                    ticketId = getUrlParameters('id', "", true);
                } catch (e) {
                    window.location.href = 'tickets.html';
                }
                var _this = this;
                $.ajax({
                    url: '/ticket-detail.json',
                    data: {
                        ticketId: ticketId
                    },
                    method: 'GET',
                    type: 'json',
                    success: function (respose) {
                        vd(response, 'success');
                        if (response.result) {
                            var ticket = respose.data;
                            _this.title = ticket.title;
                            _this.description = markdown.toHTML(ticket.description);
                            _this.price = ticket.price;
                            var tags = ticket.tags;
                            for (index in tags) {
                                _this.tags.push(tags[index]);
                            }
                        }
                    },
                    error: function (response) {
                        if (response) {
                            vd(response, 'error');
                        }
                    }
                });
            }
        });
    }
});

function isAuth() {
    return true;
}

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

function vd() {
    console.log(...arguments);
}
