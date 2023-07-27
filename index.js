const paragraphs = [
    "Our rewording tool is free and easy to use—with just the click of a button, the paraphrasing tool will Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa." ,
    "Rephrase your sentence, paragraph, essay, or article to your liking, with many options available to customize and perfect the reworded text.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa.",

    "Your words matter, and our paraphrasing tool is designed to ensure you use the right ones. With two free modes and five Premium modes to choose from,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa." ,"You can use QuillBot’s online Paraphraser rephrase Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa." ,
    "Any text in a variety of ways. Our product will, improve your fluency while also ensuring you have the appropriate vocabulary, tone, and style for any and our AI will work with you to create the best paraphrase. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eveniet corporis tempore debitis nulla iure quibusdam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa.",
    " Non, delectus similique. Voluptates deleniti sequi error delectus dolorum neque mollitia suscipit minus quaerat. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa. ",
    "Ab odit quas, itaque voluptatem voluptas expedita molestiae, voluptates nam aut quos ex facere perspiciatis, ipsa alias ut veritatis. Ex labore molestiae dolor earum quos animi accusantium enim sequi quaerat.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa. ",
    "Laborum, repellat quis voluptatum officiis repellendus qui quasi dolore dolores tempora sapiente quo unde temporibus libero similique aut dolorem. ",
    " Nisi cupiditate dolore eum dolorum ipsam porro nam quisquam doloremque ex Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa.",
    "Laboriosam eum officia ducimus quod necessitatibus possimus delectus, minima laborum sunt excepturi eius vitae dolor nostrum quam magnam atque culpa quaerat architecto reprehenderit qui voluptate.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quibusdam, impedit corrupti veniam inventore dicta voluptas placeat eveniet earum. Inventore recusandae ipsam voluptas earum maxime exercitationem deleniti sint ullam culpa. ",

]

const  typingText = document.querySelector(".typing_text p ")
const inputField =document.querySelector('.wrapper .input_filed')
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag =  document.querySelector(".wpm span" )
const cpmTag =  document.querySelector(".cpm span" )
const  tryAgainBtn  = document.querySelector("button")
let timer , maxTime = 60,
timeLeft = maxTime,
charIndex = 0,
mistakes = 0
isTyping = 0
function randomParagraph(){
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
    paragraphs[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown",()=> inputField.focus())
    typingText.addEventListener("click",()=> inputField.focus())

}
function  initTyping(){
    const characters =typingText.querySelectorAll("span")
    let typedChar = inputField.value.split('')[charIndex]
    if(charIndex  < characters.length-1 && timeLeft >0){
            if(!isTyping){
                timer = setInterval(initTimer, 100)
                isTyping =true
            }
            if(typedChar == null){
                charIndex--;
        
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
        
                characters[charIndex].classList.remove("correct",'incorrect')
            }
            else{
                if(characters[charIndex].innerText === typedChar){
                    characters[charIndex].classList.add('correct')
                }
                else 
                {
                    mistakes++
                    characters[charIndex].classList.add('incorrect')
                }
                charIndex++
            }
            
            characters.forEach(span => span.classList.remove("active"))
            characters[charIndex].classList.add('active')

            let wpm = Math.round((((charIndex- mistakes) /5)/(maxTime-timeLeft))*60)
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0:wpm 
            mistakeTag.innerText= mistakes
            cpmTag.innerText= charIndex - mistakes
            wpmTag.innerText = wpm
            cpmTag.innerText =  charIndex - mistakes 
        }
    else{
        inputField.value = ""
        clearInterval(timer)
    }

}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText = timeLeft
    }
    else{
        clearInterval(timer)
    }
}
function resetGame(){
    randomParagraph()
    inputField.value = ""
    clearInterval(timer)
    timeLeft = maxTime,
    charIndex = mistakes= isTyping =0
    mistakeTag.innerText= mistakes
    cpmTag.innerText=0
    timeTag.innerTex = mistakes
    cpmTag.innerText =0
}
randomParagraph()
inputField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)