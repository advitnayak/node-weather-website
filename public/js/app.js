console.log("Client side JavaScript is loaded ")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#Message1')
const messageTwo = document.querySelector('#Message2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading........'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
        }else{
            messageOne.textContent = data.geo_location
            messageTwo.textContent = data.forecast
        }
       
    })
})
});





// fetch('http://localhost:3000/weather?address='+location).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             messageOne.textContent= data.error
//         }else{
//             messageOne.textContent = data.Address
//             messageTwo.textContent = data.forecast
//         }
       
//     })
// })