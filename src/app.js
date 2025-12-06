const inputField = document.getElementById('userInput');
const messageDisplay = document.getElementById('messages');

inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userMessage = inputField.value;
        displayMessage('User: ' + userMessage);
        inputField.value = '';
        getBotResponse(userMessage);
    }
});

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageDisplay.appendChild(messageElement);
}

function getBotResponse(userMessage) {
    let jsonData = {messages:[{role:"system",content:"Answer user question"},{role: "user", content: userMessage}],model_params:{temperature:0.3,top_p:1,max_new_tokens:2048,stream:true},model:"llama-3.2-3b-instruct"};
    
    let requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
    }

    const apiUrl = "http://127.0.0.1:1234/v1/chat/completions";

    fetch(apiUrl, requestOptions).then(res => res.json()).then(apiData => {
        let theResponse = apiData.choices[0].message.content;
        const botResponse = 'Chatbot: ' + theResponse;
        displayMessage(botResponse);            
    }).catch((error) => {
        console.log("Error", error);
    })
}