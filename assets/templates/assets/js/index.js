jQuery(document).ready(function($){

    console.log('Hello world');
    // Call a rest api
    $.ajax({
        url: 'https://us-central1-training-freshers.cloudfunctions.net/function-1',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(error){
            console.log(error);
        }
    });

});