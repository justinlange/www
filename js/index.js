var app = {
/*
    location for the messageDiv, in percentage:
*/
    loc: {
        x: 10,
        y: 10
    },
/*
    Application constructor
*/
    initialize: function() {
        this.bindEvents();          // bind any UI events to listeners
        console.log("Starting Accelerometer app");
    },
/*
    bind any events that are required on startup to listeners:
*/
    bindEvents: function() {
        //waterButton.addEventListener('touchend', this.turnOffWater, false);
        waterButton.addEventListener('click', this.turnOffWater, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('click', this.resetScreen, false);

    },

/*
    this runs when the device is ready for user interaction:
*/
    onDeviceReady: function() {
        // start watching the accelerometer:
        app.watchAcceleration();
        console.log("ondeviceread");
    },

    watchAcceleration: function() {
        function success(acceleration) {
            // clear the messageDiv and add the accelerometer values:
            app.clear();
            app.display('X: ' + acceleration.x.toFixed(2));
            app.display('Y: ' + acceleration.y.toFixed(2));
            app.display('Z: ' + (acceleration.z - 9.80).toFixed(2));
            
            // set app.loc using the accelerometer values:
            app.loc.x -= acceleration.x;
            app.loc.y -= acceleration.y;
            
            // set the messageDiv style parameters using app.loc:
            messageDiv.style.top = app.loc.y  + '%';
            messageDiv.style.left = app.loc.x + '%';
        }
            
        function failure(error) {
            // if the accelerometer fails, display the error:
            app.display('Accelerometer error');
            app.display(error);
        }
            
        // taceh the accelerometer every 100ms: 
        var watchAccel = navigator.accelerometer.watchAcceleration(success, failure, {
            frequency: 100
        });
    },

    turnOffWater: function() {
        console.log("turnoff water called");
        //alert('function called');
        messageDiv.innerHTML = "attempting to turn off water...";


        //ajax way to send data
        xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4) {
             alert(xmlhttp.readyState);
             document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
      },

        xmlhttp.open("GET","ajax_info.txt",true);
        xmlhttp.send();
    },

//a form way to send data with javascript

    function sendData(data) {
          var XHR = new XMLHttpRequest();
          var urlEncodedData = "42";

          // We turn the data object into a URL encoded string
          for(name in data) {
            urlEncodedData += name + "=" + data[name] + "&";
          }

         

          // We URLEncode the string
          urlEncodedData = encodeURIComponent(urlEncodedData);

          // encodeURIComponent encode a little to much things
          // to properly handle HTTP POST requests.
          urlEncodedData = urlEncodedData.replace('%20','+').replace('%3D','=');

          // We define what will happen if the data are successfully sent
          XHR.addEventListener('load', function(event) {
            alert('Yeah! Data sent and water is turning off.');
          });

          // We define what will happen in case of error
          XHR.addEventListener('error', function(event) {
            alert('Oups! Something went wrong.');
          });

          // We setup our request
          XHR.open('POST', 'http://ucommbieber.unl.edu/CORS/cors.php');

          // We add the required HTTP header to handle a form data POST request
          XHR.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
          XHR.setRequestHeader('Content-Length', urlEncodedData.length);

          // And finally, We send our data.
          XHR.send(urlEncodedData);
        },


  
    
    // reset the messageDiv to the center of the screen:
    resetScreen: function() {
        app.loc.x = 50;
        app.loc.y = 50;
        messageDiv.style.top = app.loc.y  + '%';
        messageDiv.style.left = app.loc.x + '%';
    },
    /*
        appends @message to the message div:
    */
    display: function(message) {
        var label = document.createTextNode(message),
            lineBreak = document.createElement("br");
        messageDiv.appendChild(lineBreak);          // add a line break
        messageDiv.appendChild(label);              // add the text
    },
    /*
        clears the message div:
    */
    clear: function() {
        messageDiv.innerHTML = "";
    }
};          // end of app