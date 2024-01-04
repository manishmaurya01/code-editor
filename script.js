// Initialize CodeMirror
const editor = CodeMirror(document.getElementById("editor-container"), {
    value: `<!-- Write your HTML, CSS, and JavaScript code here -->

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dummy Application</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                text-align: center;
                padding: 20px;
            }
    
            .info {
                display: none;
                margin-top: 20px;
            }
    
            #myPhoto {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <h1>Dummy Application</h1>
        
        <button id="btn">Show Auther Info</button>
    
        <div id="info-container" class="info">
            <img id="myPhoto" src="https://manishmaurya.netlify.app/manish.png" alt="My Photo">
            <h2>Auther: <b>Manish Maurya</b></h2>
        </div>
    
        <script>
        let btn = document.getElementById("btn");
        btn.addEventListener('click', () => {
            runCode();
        });
    
       
            function runCode() {
                console.log("working")
                document.querySelector("#info-container").style.display = "block";
            }
        
        </script>
    </body>
    </html>
`,
    mode: "htmlmixed", // Support HTML, CSS, and JavaScript
    theme: "Dark",  // Use the Dark Modern theme
    lineNumbers: true,
    autofocus: true,
});

// Declare the iframe outside the function to create it only once
const outputIframe = document.createElement("iframe");
document.getElementById("output-container").appendChild(outputIframe);

// Add this function to copy the code to the clipboard
function copyCodeToClipboard() {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        // Select all elements that match the given CSS selector
        var elements = document.querySelectorAll('.CodeMirror-code .CodeMirror-line span');

        // Iterate through each element and apply the style
        elements.forEach(function (element) {
            element.style.background = "skyblue";
            setTimeout(() => {
            element.style.background = "";
            }, 1000);
        });
        
        

    }).catch((error) => {
        console.error('Unable to copy code to clipboard', error);
    });
}

// Add a click event listener to the copy icon
const copyIcon = document.getElementById('copy-icon');
copyIcon.addEventListener('click', copyCodeToClipboard);


function runCode() {
    const code = editor.getValue();
    try {
        const iframeDocument = outputIframe.contentDocument || outputIframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(code);
        iframeDocument.close();
    } catch (error) {
        const errorMessage = `<span style="color: red;">Error: ${error.message}</span>`;
        document.getElementById("output-container").innerHTML = errorMessage;
    }
}

// Automatically run the code when the editor content changes
editor.on("change", function () {
    runCode();
});
runCode()