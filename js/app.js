// UI VARIABLES
const likesContainer = document.querySelectorAll('.comment__vote');
const replyComment = document.querySelectorAll('.comment__reaction--reply')
const editComments = document.querySelectorAll('.comment__reaction--edit')
const deleteComments = document.querySelectorAll('.comment__reaction--delete')
const addNewComment = document.querySelector('.add-comment')
const sendComment = document.querySelector('.submit-btn')

const warningMessage = document .querySelector('aside')
const cancelWarning = document.querySelector('.cancel')
const confirmWarning = document.querySelector('warning')

const url = 'js/data.json'

const test = document.querySelector('.test');

// CREATE NEW COMMENT
function createComment(likes, avatarURL, currentUserName, date, replyTo, currentUserComment, container) {
    let newComment = document.createElement('div');
    newComment.className = 'comment';

    newComment.innerHTML = `<div class="comment__vote">
                        <span class="comment__vote--add"><img src="images/icon-plus.svg" alt="like comment"></span>
                        <span class="comment__vote--count">${likes}</span>
                        <span class="comment__vote--reduce"><img src="images/icon-minus.svg" alt="dislike comment"></span>
                        </div>
                        <div class="comment__main-section">
                            <div class="comment__box">
                               <div class="comment__user">
                                    <div class="user-avatar"><img src=${avatarURL} alt="user image"></div>
                                    <div class="comment__user--name">${currentUserName}</div>
                                    <div class="btn">you</div>
                                    <div class="comment__user--date">${date}</div>
                               </div> 
                               <div class="comment__post">
                                    <p class="post"><span class="emphasis">${replyTo}</span>${currentUserComment}</p>
                               </div>
                            </div> 
                            <div class="comment__reaction">
                                <div class="comment__reaction--delete">
                                    <img src="images/icon-delete.svg" alt="delete comment">
                                    <span>delete</span>
                                </div>
                                <div class="comment__reaction--edit">
                                    <img src="images/icon-edit.svg" alt="edit comment">
                                    <span>edit</span>
                                </div>
                            </div>  
                        </div>
                        `
    // return newComment
    container.appendChild(newComment)
}

// createComment(test)


function displayData() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data = Array(data)
            // addNewComment.textContent += data[0].comments[0].content
            data.forEach(user => {
                
            });
            console.log(data)
        })
}

displayData()

// LIKE OR DISLIKE A COMMENT

likesContainer.forEach(likesCount => {
    likesCount.addEventListener('click', (e)=> {

        if(e.target.parentElement.className == 'comment__vote--add') {
            let num = e.target.parentElement.nextElementSibling.innerText
            num = parseInt(num)
            num += 1
            e.target.parentElement.nextElementSibling.innerText = num

        }

        if(e.target.parentElement.className == 'comment__vote--reduce') {
            let num = e.target.parentElement.previousElementSibling.innerText
            num = parseInt(num)
            num -= 1
            e.target.parentElement.previousElementSibling.innerText = num

        }
            
    })
    
});

// REPLY COMMENT 
replyComment.forEach(reply => {
    reply.addEventListener('click', ()=> {
        addNewComment.focus()
    });
});

// EDIT COMMENT
editComments.forEach(editComment => {
    editComment.addEventListener('click', (e)=> {


        let commentContainer = e.target.parentElement.parentElement.parentElement.firstElementChild;
        let post = commentContainer.firstElementChild.nextElementSibling
        addNewComment.textContent = post.innerText;
        addNewComment.focus();

        sendComment.addEventListener('click', (e)=> {
            
            post.innerText = addNewComment.value
            
            addNewComment.value = ''
        });
    });
});

// DELETE COMMENT
deleteComments.forEach(deleteComment => {
    deleteComment.addEventListener('click', (event)=> {
        warningMessage.style.display = 'flex'
        // CANCEL WARNING
        warningMessage.addEventListener('click', (e)=> {
            if (e.target.classList.contains('cancel')) {
                warningMessage.style.display = 'none'
            }
            // DELETE COMMENT
            if (e.target.classList.contains('warning')) {
                event.target.parentElement.parentElement.parentElement.parentElement.remove()
                warningMessage.style.display = 'none'
            }
        })

    })
});


// (function(){
//     let keystoppedTimer = null;
//     let keystoppedInputs = document.getElementsByTagName('textarea');
//     for (let i = 0, l = keystoppedInputs.length; i < l; i++) {
//         keystoppedInputs[i].addEventListener('keydown', function(event){
//             clearTimeout(keystoppedTimer);
//             keystoppedTimer = setTimeout(function() {
//                 event.target.dispatchEvent( new Event('keystopped') );
//             }, 600);
//         }, false);
//     }
// }());

// // ADD NEW COMMENT
// addNewComment.addEventListener('keystopped', (event)=> {
//     let comment = ''
//     comment += event.target.value
    
// })

sendComment.addEventListener('click', (e)=> {

    let container = document.querySelector('.container')
    createComment('5', 'images/avatars/image-ramsesmiron.png', 'ramsis', '1 hour ago', '', addNewComment.value, container)
    console.log(e)
    addNewComment.value = ''
})



// function loadData() {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', url, true)
//     xhr.onload = function() {
//         if (this.status == 200) {
//             console.log(this.responseText)
//         } else {
//             console.error(this.readyState)
//         }
//     }

//     xhr.send()
// }

// loadData()
