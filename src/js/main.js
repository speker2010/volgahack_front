$(document).ready(function () {
    console.log('hello world');
    $('[type=tel]').inputmask({
            mask: '+7(999)999 99 99'
        });
});
