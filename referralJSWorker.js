
var formData;

self.addEventListener('message', function (e) {
    var data = e.data;
    switch (data.event) {
        case 'submit':
            formData = data.formData
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    };
}, false);
