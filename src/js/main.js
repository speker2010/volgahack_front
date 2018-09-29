$(document).ready(function () {
    console.log('hello world');
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
            })
        }
    });

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



    var app = new Vue({
        el: '#app',
        data: {
            hello: 'Привет, Vue!'
        }
    });

    var usersApp = new Vue({
        el: '#user',
        data: {
            user:
                { username: 'Саня', karma: '100', about: 'Сражаюсь с криминалом', social_link: 'vk.com' }
        }
    });
    /*    var markdownText = "Hello.\\n\\n* This is markdown.\\n* It is fun\\n* Love it or leave it.";
        console.log(markdown);
        var text = markdown.toHTML(markdownText);
        $('body').append(text);*/
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

function bAjax(url, data, method, successCallback, errorCallback) {
    $.ajax({
        url: url,
        data: data,
        method: method,
        success: successCallback,
        error: errorCallback
    });
}